import { ListIcon, X } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router';
import Button from '~/hkit/Button';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Personal', path: '/personal' },
    { name: 'Business', path: '/business' }
];

const NavBar: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(false);
    const prevScrollY = useRef<number>(0);

    // Detect screen width
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Auto-hide on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY.current && currentScrollY > 100) {
                setHidden(true); // Scrolling down
            } else {
                setHidden(false); // Scrolling up
            }

            prevScrollY.current = currentScrollY;
        };

        if (menuOpen) {setMenuOpen(false)};

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed z-[999] bg-neutral-800 right-0 left-0 py-2 px-2 m-2 rounded-lg items-center gap-10 justify-between transition duration-300 ${
                hidden ? '-translate-y-[100px]' : 'translate-y-0'
            }`}
        >
            {isMobile ? (
                <div className="flex flex-col justify-between w-full relative">
                    <div className='flex flex-row justify-between w-full'>
                        <Link to={"/"}>
                            <img src="./hh_logo.svg" className='max-w-[8rem]' alt="" />
                        </Link>
                        <Button onClick={() => setMenuOpen(!menuOpen)} appendBefore={<ListIcon />} label="Menu" size="rounded" variant="secondary" fillWidth={false} />
                    </div>
                    {menuOpen && (
                        <div className="right-0 mt-2 bg-neutral-800 rounded-lg shadow-lg z-50 p-4">
                            <ul style={{ display: 'block', listStyle: 'none', margin: 0, padding: 0 }}>
                                {navLinks.map(link => (
                                    <li key={link.name}>
                                        <Button link={link.path} onClick={() => setMenuOpen(false)} label={link.name} variant='tertiary' size='lg' />
                                    </li>
                                ))}
                                <li>
                                    <Button link="https://portal.hearthero.app" onClick={() => setMenuOpen(false)} label="Access Portal" variant='secondary' size='lg' />
                                </li>
                            </ul>
                            <Button icon={<X />} label='Close' variant="secondary" size="lg" onClick={() => setMenuOpen(false)} fillWidth={false} />
                        </div>
                    )}access
                </div>
            ) : (
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row items-center gap-8'>
                        <img src="./hh_logo.svg" className='max-w-[10rem]' alt="" />
                        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
                            {navLinks.map(link => (
                                <li key={link.name} style={{ marginRight: '0.5rem' }}>
                                    <Button link={link.path} label={link.name} variant='tertiary' />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="https://portal.hearthero.app">
                        <Button label="Login to Portal" size="md" variant="primary" fillWidth={false} type='button'/>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
