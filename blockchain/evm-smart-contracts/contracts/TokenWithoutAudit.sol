// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

pragma solidity ^0.8.26;

/**
 * Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract TokenWithoutAudit is Context, Ownable, Pausable, IERC20, IERC20Metadata {
    using Address for address;

    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    mapping(address => bool) private isBlackListed;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    uint8 private _decimals;

    event AddedBlackList(address _user);
    event DestroyedBlackFunds(address _blackListedUser, uint256 _balance);
    event RemovedBlackList(address _user);

    //ToDo
    uint private _taxFee; // for 1% enter 1
    uint private _burnFee; // for 2% enter 2
    uint private _charityFee; // for 3% enter 3
    uint private _adFee; // for 4% enter 4

    address private takeTaxFeeAddress;
    address private takeCharityFeeAddress;
    address private takeAdFeeAddress;

    mapping(address => bool) private _excludeFromFee;

    /**
     *  Sets the values for {name} and {symbol}.
     *
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(
        string memory name_, string memory symbol_, uint256 total_supply_, uint8 decimals_ ,
        uint tax_fee_, uint burn_fee_, uint charity_fee_, uint ad_fee_,
        address takeTaxFeeAddress_ , address takeCharityFeeAddress_, address takeAdFeeAddress_
    ) Ownable(msg.sender) {
        _name = name_;
        _symbol = symbol_;
        _decimals = decimals_;

        _taxFee = tax_fee_;
        _burnFee = burn_fee_;
        _charityFee = charity_fee_;
        _adFee = ad_fee_;

        takeTaxFeeAddress = takeTaxFeeAddress_;
        takeCharityFeeAddress = takeCharityFeeAddress_;
        takeAdFeeAddress = takeAdFeeAddress_;

        //ToDo
        excludeFromFee(takeTaxFeeAddress);
        excludeFromFee(takeCharityFeeAddress);
        excludeFromFee(takeAdFeeAddress);

        _mint(msg.sender, total_supply_);
    }

    /**
     *
     *  Exclude address `account` from the all fees
     *
     */
    function excludeFromFee(address account) public onlyOwner {
        // require(_excludeFromFee[account] == false, "This Account excluded before");

        _excludeFromFee[account] = true;
    }

    /**
     *
     *  Include address `account` for all the fees
     *
     */
    function includeForFee(address account) public onlyOwner {
        // require(_excludeFromFee[account] == true, "This Account included before");

        _excludeFromFee[account] = false;
    }

    /**
     *
     *  Check status of paying fee for address `account`
     *
     */
    function excludeStatus(address account) public view returns (bool) {
        return _excludeFromFee[account];
    }

    /**
     *
     *  Set a new address for getting Tax Fee
     *
     */
    function setTaxFeeAddress(address newTaxFeeAddress) public onlyOwner {
        takeTaxFeeAddress = newTaxFeeAddress;
    }

    /**
     *
     *  Return current address for transferring fees
     *
     */
    function getTaxFeeAddress() public view returns (address){
        return takeTaxFeeAddress;
    }

    /**
     *
     *  Set a new address for getting Charity Fee
     *
     */
    function setCharityFeeAddress(address newCharityFeeAddress) public onlyOwner {
        takeCharityFeeAddress = newCharityFeeAddress;
    }

    /**
     *
     *  Return current address for transferring fees
     *
     */
    function getCharityFeeAddress() public view returns (address){
        return takeCharityFeeAddress;
    }

    /**
     *
     *  Set a new address for getting Ad Fee
     *
     */
    function setAdFeeAddress(address newAdFeeAddress) public onlyOwner {
        takeAdFeeAddress = newAdFeeAddress;
    }

    /**
     *
     *  Return current address for transferring fees
     *
     */
    function getAdFeeAddress() public view returns (address){
        return takeAdFeeAddress;
    }

    /**
     *
     *  Set new tax fee
     *
     */
    function setTaxFee(uint newTaxFee) public onlyOwner {
        _taxFee = newTaxFee;
    }

    /**
     *
     *  Return current tax fee
     *
     */
    function taxFee() public view returns (uint){
        return _taxFee;
    }

    /**
     *
     *  Set new burn fee
     *
     */
    function setBurnFee(uint newBurnFee) public onlyOwner {
        _burnFee = newBurnFee;
    }

    /**
     *
     *  Return current burn fee
     *
     */
    function burnFee() public view returns (uint){
        return _burnFee;
    }

    /**
     *
     *  Set new charity fee
     *
     */
    function setCharityFee(uint newCharityFee) public onlyOwner {
        _charityFee = newCharityFee;
    }

    /**
     *
     *  Return current charity fee
     *
     */
    function charityFee() public view returns (uint){
        return _charityFee;
    }

    /**
     *
     *  Set new Ad fee
     *
     */
    function setAdFee(uint newAdFee) public onlyOwner {
        _adFee = newAdFee;
    }

    /**
     *
     *  Return current Ad fee
     *
     */
    function adFee() public view returns (uint){
        return _adFee;
    }

    /**
     *  Returns the name of the token.
     */
    function name() public view override returns (string memory) {
        return _name;
    }

    /**
     *  Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    /**
     *  Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /**
     *  See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    /**
     *  See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    /**
     *  See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        address owner_ = _msgSender();

        uint newAmount = getFees(owner_, amount);

        _transfer(owner_, to, newAmount);
        return true;
    }

    /**
     *  See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     *  See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    /**
     *  See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);

        uint newAmount = getFees(from, amount);
        _transfer(from, to, newAmount);
        return true;
    }

    function getFees(address from, uint amount) private returns (uint) {

        if (_excludeFromFee[from]) {
            return amount;
        }

        uint taxAmount = amount * taxFee() / 100;
        uint burnAmount = amount * burnFee() / 100;
        uint charityAmount = amount * charityFee() / 100;
        uint AdAmount = amount * adFee() / 100;

        burnTo(from, burnAmount);
        _transfer(from, takeTaxFeeAddress, taxAmount);
        _transfer(from, takeCharityFeeAddress, charityAmount);
        _transfer(from, takeAdFeeAddress, AdAmount);

        return amount - taxAmount - burnAmount - charityAmount - AdAmount;

    }

    /**
     *  Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     *  Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     *  Moves `amount` of tokens from `sender` to `recipient`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(address from, address to, uint256 amount) private notBlacklisted whenNotPaused {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");

        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    /**  Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) public virtual onlyOwner notBlacklisted whenNotPaused {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount * (10 ** _decimals);
        _balances[account] += amount * (10 ** _decimals);
        emit Transfer(address(0), account, amount * (10 ** _decimals));

        _afterTokenTransfer(address(0), account, amount);
    }

    /**
     *  Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) private notBlacklisted whenNotPaused {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");

        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function burn(address account, uint256 amount) public onlyOwner notBlacklisted whenNotPaused {
        _burn(account, amount);
    }

    function burnTo(address account, uint256 amount) private notBlacklisted whenNotPaused {
        _burn(account, amount);
    }

    /**
     *  Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) private whenNotPaused {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     *  Updates `owner` s allowance for `spender` based on spent `amount`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(address owner, address spender, uint256 amount) private {

        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");

            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    /**
     *  Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) private {}

    /**
     *  Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(address from, address to, uint256 amount) private {}

    /**
     *
     *  Blacklist Feature: Return blacklist status of given account `_maker`
     *
     */
    function getBlackListStatus(address _maker) public view returns (bool) {
        return isBlackListed[_maker];
    }

    /**
     *
     *  Blacklist Feature: Add an address `_evilUser` to the blacklist
     *
     */
    function addBlackList(address _evilUser) public onlyOwner {
        require(isBlackListed[_evilUser] == false, "This account has already been blacklisted");

        isBlackListed[_evilUser] = true;
        emit AddedBlackList(_evilUser);
    }

    /**
     *
     *  Blacklist Feature: Remove an address `_clearedUser` from the blacklist
     *
     */
    function removeBlackList(address _clearedUser) public onlyOwner {
        require(isBlackListed[_clearedUser] == true, "This account has already been whitelisted");

        isBlackListed[_clearedUser] = false;
        emit RemovedBlackList(_clearedUser);
    }

    /**
     *
     *  Blacklist Feature: Destroy all available funds of address `_blackListedUser` and burn that tokens
     *
     */
    function destroyBlackFunds(address _blackListedUser) public onlyOwner {
        require(isBlackListed[_blackListedUser]);

        uint256 dirtyFunds = balanceOf(_blackListedUser);
        _balances[_blackListedUser] = 0;
        _totalSupply -= dirtyFunds;

        emit DestroyedBlackFunds(_blackListedUser, dirtyFunds);
    }

    /**
     *
     *  Blacklist Feature: modifier for checking blacklisted status
     *
     */
    modifier notBlacklisted {
        require(!isBlackListed[_msgSender()], "Sender is blacklisted.");
        _;
    }
}