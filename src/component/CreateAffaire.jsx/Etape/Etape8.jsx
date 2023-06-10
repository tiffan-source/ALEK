import React, { Component } from 'react'
import axios from 'axios';

class Etape8 extends Component {

  constructor(){
    super()

    this.state = {
      missions : [],
      mission_select : []
    }
  }

  async componentDidMount(){
    try {
      let {data} = await axios.get(process.env.REACT_APP_STARTURIBACK + '/admin/mission/');
      this.setState({missions : data.results});
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    return (
      <div>
          <h2 className='text-sm font-bold text-center mb-4'>Retenir ici les missions a recopier ou a selectionner</h2>

          <table className='text-sm border border-gray-600 w-full'>
            <thead>
              <tr>
                <td>Sel</td>
                <td>Mission contractuelle</td>
                <td>Libele mission contractuelle</td>
              </tr>
            </thead>
            <tbody>
              {this.state.missions.map((mission, index)=>{
                return (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" name="" id="" onClick={e=>{
                        if(e.target.checked){
                          if(!this.state.mission_select.includes(mission.id)){
                            this.setState({mission_select: [...this.state.mission_select, mission.id]});
                          }
                        }else{
                          if(this.state.mission_select.includes(mission.id)){
                            this.setState({mission_select: this.state.mission_select.filter(dt=>dt!==mission.id)});
                          }
                        }
                      }}/>
                    </td>
                    <td>
                      {mission.code_mission}
                    </td>
                    <td>
                      {mission.libelle}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div className='my-2 text-end'>
            <button className='bg-green-600 rounded-lg shadow p-2 text-white' onClick={()=>{

              this.props.create(this.state.mission_select);

            }}>Valider</button>
          </div>
      </div>
    )  
  }
}

export default Etape8