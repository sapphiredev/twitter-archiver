import React from 'react';

import {
	updateHistoryIfNeeded,
	openModal,
} from '~/client/actions';

import {
	Tweet,
	Entities,
} from '~/shared/models';

import {
	HeaderComponent,
	TextComponent,
	MediaComponent,
	FooterComponent,
} from '~/client/components';

import {
	hydrateTweet,
	hydrateEntities,
} from '~/shared/helpers';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
	isRetweet: boolean;
	isQuote: boolean;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

interface ComponentState {
	hydratedTweet: Tweet;
	hydratedEntities: Entities;
}

export class TweetComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		const {
			tweet,
		} = this.props;

		const hydratedTweet = hydrateTweet(tweet);
		const hydratedEntities = hydrateEntities(hydratedTweet);

		this.state = {
			'hydratedTweet': hydratedTweet,
			'hydratedEntities': hydratedEntities,
		};
	}

	private getText(hydratedTweet: Tweet) {
		const {
			text,
			full_text,
		} = hydratedTweet;

		if (full_text !== undefined) {
			return full_text;
		}
		if (text !== undefined) {
			return text;
		}
		return '';
	}

	public render() {
		const {
			isQuote,
		} = this.props;

		const {
			hydratedTweet,
			hydratedEntities,
		} = this.state;

		const {
			quoted_status,
		} = hydratedTweet;

		const text = this.getText(hydratedTweet);

		return (
			<div className="tweet">
				<HeaderComponent
					{...this.props}
					isQuote={isQuote}
				/>
				<Segment.Group size="tiny">
					<Segment>
						<TextComponent
							text={text}
							entities={hydratedEntities}
						/>
					</Segment>
					{(() => {
						if (hydratedEntities === undefined) {
							return null;
						}

						if (hydratedEntities.media === undefined) {
							return null;
						}
						return (
							<Segment>
								<MediaComponent
									{...this.props}
									entities={hydratedEntities}
								/>
							</Segment>
						);
					})()}
					{(() => {
						if (quoted_status === undefined) {
							return null;
						}
						return (
							<Segment>
								<TweetComponent
									{...this.props}
									tweet={quoted_status}
									isQuote={true}
								/>
							</Segment>
						);
					})()}
				</Segment.Group>
				<FooterComponent {...this.props} />
			</div>
		);
	}
}
