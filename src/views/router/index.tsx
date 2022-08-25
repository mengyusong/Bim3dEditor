import Course from '../pages/Course';
import Document from '../pages/Document';
import Editor from '../pages/Editor';
import Example from '../pages/Example';
import Home from '../pages/Home/Index';
import Login from '../pages/Login';

const routerConfig = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/example',
        element: <Example />
    },
    {
        path: '/document',
        element: <Document />
    },
    {
        path: '/course',
        element: <Course />
    },
    {
        path: '/editor',
        element: <Editor />
    },
    {
        path: '/login',
        element: <Login />
    }
];
export default routerConfig;