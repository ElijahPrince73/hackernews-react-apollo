import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class LinkList extends PureComponent {
  updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  };

  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) {
            console.log(error);
            return <div>Error</div>;
          }

          const linksToRender = data.feed.links;

          return (
            <>
              {linksToRender.map((link, index) => (
                <Link
                  key={link.id}
                  link={link}
                  index={index}
                  updateStoreAfterVote={this.updateCacheAfterVote}
                />
              ))}
            </>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;