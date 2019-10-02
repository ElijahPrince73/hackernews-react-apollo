import React, { PureComponent } from 'react'

class Link extends PureComponent {
  render() {
    const { description, link: { url } } =  this.props
    return (
      <>
        {description} {url}
      </>
    )
  }
}