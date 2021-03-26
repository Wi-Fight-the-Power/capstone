// import React from 'react'
// import {connect} from 'react-redux'
// import {NavLink} from 'react-router-dom'
// import {Link} from 'react-router-dom'
// import {sendUser} from '../store/game'

//const exists = JSON.parse(localStorage.getItem('user') || '{}');

// class HomePage extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       handle: '',
//       isDrawing: false,
//       score: 0,
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange(event) {
//     this.setState({
//       handle: event.target.value
//     })
//   }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   const user = JSON.stringify(this.state);
  //   localStorage.setItem('user', user);
  //   this.props.sendUser(this.state)
  //   this.setState({
  //     handle: '',
  //     isDrawing: false,
  //     score: 0
  //   })
  // }
  // render() {
    // Existing User will be based off of cookie/session/local storage
    // const {handle} = this.state
    // return (
      //handle ? (
      // <div>
      //   <h1>User Avatar</h1>
      //   <h2>Options to Edit/Update their avatar below</h2>
      //   <h4>Edit Background</h4>
      //   <h4>Edit Head/Face</h4>
      //   <h4>Edit Body</h4>
      //   <form onSubmit={this.handleSubmit}>
      //   <h2>
      //     <label htmlFor='username'>Edit Username:</label>
      //     <input type='text' name='username' value={handle} onChange={this.handleChange}/>
      //   </h2>
      //   </form>
      //   <h3>
      //   <NavLink to="/createlobby">Create Lobby</NavLink>
      //   <NavLink to="/joinlobby">Join Lobby</NavLink>
      //   </h3>
      //   <button type="submit">Confirm Changes</button>
      // </div>
      //) :
      //(
//       <div>
//         <h1>Choose Your Avatar!</h1>
//         <h2>Options to Edit/Update their avatar below</h2>
//         <h4>Choose Background</h4>
//         <h4>Choose Head/Face</h4>
//         <h4>Choose Body</h4>
//         <form onSubmit={this.handleSubmit}>
//         <h2>
//           <label htmlFor='username'>Create Username:</label>
//         </h2>
//           <input type='text' name='username' value={handle} onChange={this.handleChange}/>
//         <button type="submit" >Create</button>
//         </form>
//         <Link to='/lobby'>lobby</Link>
//       </div>
//     )
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//    sendUser: (user) => dispatch(sendUser(user))
//   }
// }

// export default connect(null, mapDispatch)(HomePage)
