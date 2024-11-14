import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            <header>
                <h1>My App Header</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
