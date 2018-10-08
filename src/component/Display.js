import React, { Component } from 'react'
import StickyNotes from './StickyNotes';
import Header from '../component/Header';


 class Display extends Component {
  

    render() { 
    return (
      <div> 
          {/* <br/>      */}
          <StickyNotes/>
      </div>
    )
  }
}
export default Display