import React from 'react'

export default function(ComposedComponent) {

  class RequireAuth extends React.Component {

    // Push to login route if not authenticated on mount
    componentWillMount() {
      if(!localStorage.getItem('token')) {
        // Use your router to redirect them to login page
        this.props.history.push('/login')
      }
    }

    // Push to login route if not authenticated on update
    componentWillUpdate(nextProps) {
      if(!localStorage.getItem('token')) {
        // Use your router to redirect them to login page
        this.props.history.push('/login')
      }
    }

    // Otherwise render the original component
    render() {
      return <ComposedComponent {...this.props}/>
    }

  }

  return RequireAuth

}