/*
 * Page d'exploration
 * Le but de cette page est de permettre aux utilisateurs :
 * - de découvrir des contenus à suivre sur Emendare
 */

import React from 'react'
import { Group, Page } from '../../components'
import { socket } from '../../services'

export class ExplorePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rootGroup: null
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    socket.fetch('rootGroup').then(rootGroup => {
      this.setState({ rootGroup })
    })
  }

  render() {
    return (
      <Page title="Explorer">
        {this.state.rootGroup && (
          <Group
            data={this.state.rootGroup}
            refetch={this.fetchData.bind(this)}
          />
        )}
      </Page>
    )
  }
}
