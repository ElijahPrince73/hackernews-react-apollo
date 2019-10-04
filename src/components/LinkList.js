import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";

class LinkList extends PureComponent {
  render() {
    const FEED_QUERY = gql`
      {
        feed {
          links {
            id
            url
            description
            createdAt
          }
        }
      }
    `;

    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            console.log(error);
            return <div>Error</div>;
          }

          const linksToRender = data.feed.links

          return (
            <>
              {linksToRender.map((link) => <Link key={link.id} link={link}></Link>)}
            </>
          )
        }}
      </Query>
    );
  }
}

export default LinkList;