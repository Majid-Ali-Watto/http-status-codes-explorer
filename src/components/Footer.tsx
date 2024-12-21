import React from 'react';

export default function Footer() {
    return (
        <div className="bg-gray-900 py-5">
            <footer className="text-white font-bold flex flex-wrap items-center justify-center">
                <a
                    href="https://majidev.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition-colors"
                >
                    Majid Ali - Full Stack Web Developer
                </a>
            </footer>
        </div>
    );
}
