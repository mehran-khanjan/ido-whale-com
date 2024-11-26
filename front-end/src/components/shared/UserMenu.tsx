import React, {useState} from 'react';
import Link from "next/link";
// import useWeb3Store from "../../../store/zustand/useWeb3Store";
import {usePathname} from "next/navigation";

interface PropsType {
    handleMobileMenuClick: () => void;
    isMobile: boolean;
}

const UserMenu: React.FC<PropsType> = (props: PropsType) => {
    // const signer = useWeb3Store((state: any) => state.signer);
    const pathname = usePathname();
    const [displayValue, setDisplayValue] = useState<string>('none');
    const [btnClass, setBtnClass] = useState<string>('');

    const handleSingleMenuClick = (e: any) => {
        if (props.isMobile) {
            props.handleMobileMenuClick();
        }
    }

    const handleSubMenuClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();

        if (displayValue === 'block') {
            setDisplayValue('none');
        } else if (displayValue === 'none') {
            setDisplayValue('block');
        }

        if (btnClass === '') {
            setBtnClass('open');
        } else if (btnClass === 'open') {
            setBtnClass('');
        }
    }

    return (
        <ul className="navigation">
            <li className={`${pathname === '/' ? 'active' : ''} menu-item-has-children`}>
                <Link href="/" onClick={handleSingleMenuClick}>Home</Link>
            </li>

            <li
                className={`${pathname === '/about' ? 'active' : ''} menu-item-has-children`}
                onClick={handleSubMenuClick}>

                <a href="#">Launchpad</a>

                <ul className="sub-menu" style={{display: (props.isMobile) ? `${displayValue}`: ``}}>
                    <li onClick={handleSingleMenuClick}>
                        <Link href="/launchpad">List</Link>
                    </li>

                    <li onClick={handleSingleMenuClick}>
                        <Link href="/launchpad/create">Create</Link>
                    </li>

                </ul>

                <div className={`dropdown-btn ${btnClass}`}><span className="plus-line"></span></div>

            </li>

            <li className={`${pathname === '/roadmap' ? 'active' : ''} menu-item-has-children`}>
                <Link href="/about" onClick={handleSingleMenuClick}>About</Link>
            </li>
            <li className={`${pathname === '/contact' ? 'active' : ''} menu-item-has-children`}>
                <Link href="/contact" onClick={handleSingleMenuClick}>Contact</Link>
            </li>
            {/*{ signer &&*/}
            {/*    <li className={`${pathname === '/profile' ? 'active' : ''} menu-item-has-children`}>*/}
            {/*        <Link href="/profile" onClick={handleSingleMenuClick}>Profile</Link>*/}
            {/*    </li>*/}
            {/*}*/}
        </ul>
    )
}

export default UserMenu;