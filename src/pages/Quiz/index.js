import React, { useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Chatroom, NavBar } from '../../components';
import { QuizController } from '../../layout';
import io from 'socket.io-client';

export default () => {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const { fetchRoomData } = useQuiz();
	const socket = io('https://pursuit-of-trivia.herokuapp.com/');
	useEffect(() => {
		socket.emit('joinRoom', {
			roomName: id,
			username: currentUser.displayName,
			userId: currentUser.uid,
		});
		fetchRoomData(id);
		return () => {
			socket.disconnect();
		};
	}, []);
	return (
		<main>
			<NavBar />
			<Chatroom socket={socket} />
			<QuizController socket={socket} />
		</main>
	);
};
