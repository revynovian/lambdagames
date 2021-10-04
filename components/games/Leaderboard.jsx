import React from "react";
import { Container,  Spinner } from "react-bootstrap";

import styles from "./Leaderboard.module.css"
const LeaderBoard = ({isLoad,dataPlayers}) => {

  return (
  <>
    {/* leaderboard table section*/}
      <Container className="text-white">
        <table className={`mb-5 mt-3 ${styles.customTable}`}>
          <thead style={{color: "#FFCA2C"}}>
          <tr>
            <th style={{width : "8%"}}>Rank</th>
            <th>Username</th>
            <th>City</th>
            <th>Points</th>
          </tr>
          </thead>
          <tbody>
          {(isLoad)? dataPlayers.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.username}</td>
                <td>{item.city}</td>
                <td>{item.score}</td>
              </tr>
            )}) : 
              <tr>
              <td className="text-center" colSpan="4">
                <Spinner animation="border" role="status" variant="warning" />
              </td>
              </tr>}            
          </tbody>
        </table>
      </Container>
  </>
  )
}

export default LeaderBoard;