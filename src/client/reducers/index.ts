import {
	combineReducers,
} from 'redux';

import {
	history,
	HistoryState,
} from './HistoryReducer';

import {
	modal,
	ModalState,
} from './ModalReducer';

import {
	relations,
	RelationsState,
} from './RelationsReducer';

import {
	socket,
	SocketState,
} from './SocketReducer';

import {
	stats,
	StatsState,
} from './StatsReducer';

import {
	tweet,
	TweetState,
} from './TweetReducer';

export interface State {
	historyState: HistoryState;
	modalState: ModalState;
	relationsState: RelationsState;
	socketState: SocketState;
	statsState: StatsState;
	tweetState: TweetState;
}

export const reducers = combineReducers<State>({
	'historyState': history,
	'modalState': modal,
	'relationsState': relations,
	'socketState': socket,
	'statsState': stats,
	'tweetState': tweet,
});
