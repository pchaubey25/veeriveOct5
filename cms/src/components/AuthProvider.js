import { useReducer, useEffect } from 'react'; // Importing React hooks for state management and side effects
import { useNavigate } from 'react-router-dom'; // Importing hook for programmatic navigation
import { toast } from 'react-toastify'; // Importing toast notifications for user feedback
import AuthContext from '../context/AuthContext'; // Importing AuthContext to provide authentication state and functions
import axios from '../config/axios'; // Importing axios instance configured for API calls

// Initial state for the authentication context
const initialState = {
    user: null, // Initially, no user is logged in
    isLoggedIn: false // Initially, the user is not logged in
};

// Reducer function to handle state changes based on actions
const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_USER': {
            // On login action, set user data and update login status
            return { ...state, isLoggedIn: true, user: action.payload };
        } 
        case 'LOGOUT_USER': {
            // On logout action, clear user data and update login status
            return { ...state, isLoggedIn: false, user: null };
        }
        default:
            // Return the current state if the action type does not match
            return state;
    }
};

// AuthProvider component to manage authentication logic
function AuthProvider(props) {
    const navigate = useNavigate(); // Initialize navigate for redirecting users
    const [state, dispatch] = useReducer(reducer, initialState); // Initialize state and dispatch for handling state changes

    // useEffect to handle user authentication on page reload
    useEffect(() => {
        (async () => {
            // Check if token exists in localStorage
            if (localStorage.getItem('token')) {
                try {
                    // Fetch user data using the token
                    const userResponse = await axios.get('/api/users/account', { headers: { 'Authorization': localStorage.getItem('token') } });
                    // Dispatch action to update state with user data
                    dispatch({ type: 'LOGIN_USER', payload: userResponse.data });
                } catch (err) {
                    // Handle error if fetching user data fails
                }
            }
        })();
    }, []); // Empty dependency array means this effect runs once on component mount

    // Function to handle user registration
    const handleRegister = async (formData) => {
        try {
            // Make API call to register a new user
            const response = await axios.post('/api/users/register', formData);
            // Notify user of successful registration
            toast('Successfully Registered', { autoClose: 2000 });
            // Redirect user to login page
            navigate('/login');
        } catch (err) {
            // Log error if registration fails
            console.log(err);
        }
    };

    // Function to handle user login
    const handleLogin = async (formData) => {
        try {
            // Make API call to authenticate user
            const response = await axios.post('/api/users/login', formData);
            // Save token to localStorage
            localStorage.setItem('token', response.data.token);
            // Notify user of successful login
            toast('Successfully logged in');
            // Fetch user data using the token
            const userResponse = await axios.get('/api/users/account', { headers: { 'Authorization': response.data.token } });
            // Dispatch action to update state with user data
            dispatch({ type: 'LOGIN_USER', payload: userResponse.data });
            // Redirect user to admin home page
            navigate('/admin-home');
        } catch (err) {
            // Notify user of login failure
            console.error('Login failed:', err);
            toast('Login failed', { autoClose: 5000 });
        }
    };

    // Function to handle user logout
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Dispatch action to clear user data and update login status
        dispatch({ type: 'LOGOUT_USER' });
        // Notify user of successful logout
        toast("Successfully logged out");
        // Redirect user to login page
        navigate('/login');
    };

    // Provide authentication state and functions to child components
    return (
        <AuthContext.Provider value={{ state, handleRegister, handleLogin, handleLogout }}>
            {props.children} 
        </AuthContext.Provider>
    );
}

export default AuthProvider;



/*
1. Create Login Component - with form input - email & password
2. write client side validation
3. if the validation pass
    then call the handleLogin(formData)
4. inside handleLogin -> make api call to '/api/users/login' 
5. once the password credential match, write the token to the localStorage 
6. notify via toast user has logged in successfully

*/ 