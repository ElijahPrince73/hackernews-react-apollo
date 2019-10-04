import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class CreateLink extends PureComponent {
  state = {
    description: '',
    url: ''
  }

  render() {
    const { description, url } = this.state

  const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
      post(description: $description, url: $url) {
        id
        createdAt
        url
        description
      }
    }
  `;

    return (
      <div>
        <div>
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="Link Description"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            placeholder="URL for link"
          />
          <Mutation
            mutation={POST_MUTATION} 
            variables={{ description, url }}
          >
            {postMutation => <button onClick={postMutation}>Submit</button>}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default CreateLink