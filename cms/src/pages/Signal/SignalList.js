// pages/Signal/SignalList.js
import React, { useContext } from 'react';
import SignalContext from '../../context/SignalContext';
import axios from '../../config/axios';
import AuthContext from '../../context/AuthContext';

export default function SignalList() {
    const { signals, signalsDispatch, handleEditClick } = useContext(SignalContext);
    const { state } = useContext(AuthContext);
    const userRole = state.user?.role;

    const handleRemove = async (id) => {
        const userInput = window.confirm('Are you sure you want to remove this signal?');
        if (userInput) {
            try {
                const response = await axios.delete(`/api/admin/signals/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                signalsDispatch({ type: 'REMOVE_SIGNAL', payload: response.data._id });
            } catch (err) {
                alert(err.message);
            }
        }
    };

    return (
        <div className="signal-list-container">
            <table className="signal-table">
                <thead>
                    <tr>
                        <th>Signal Name</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {signals.data.map((signal) => (
                        <tr key={signal._id}>
                            <td>{signal.signalName}</td>
                            <td>{signal.generalComment}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditClick(signal._id)} disabled={userRole === 'User'}>Edit</button>
                                <button className="remove-btn" onClick={() => handleRemove(signal._id)} disabled={userRole === 'User'}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
