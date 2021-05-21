
import React from "react";
import "./Ask.css";
import CardsP from "./CardsP/CardsP";
import Autocomplete from "./Autocomplete";
import axios from "axios";
import PropTypes from "prop-types";
import backend from "../../env";

// function getIds(searchTerm) {
//     return ['B20016', 'B20064']
// }

class Ask extends React.Component {

    static propTypes = {
      searchTerm : PropTypes.string,
    };

    static defaultProps = {
      searchTerm : "",
    };

    constructor (props) {

        super(props);
        // const dataList = [{
        //     id:'',
        //     FirstName: '',
        //     LastName:'',
        //     Gender:'',
        //     Degree: '',
        //     Course:'',
        //     Handle:'',
        //     isTeacher:'',
        //     email:'',
        //     Skill_set:[],
        //     Contact:0,
        //     UpVotes:0,
        //     DownVotes:0,
        // }]
        this.state = {
            "searchTerm": "",
            "temp_l": [],
            "found_match": false,
            "dataList": undefined,
        };
        axios.get(backend+"autocomplete",{
            params:{
                query: "j"
            }
        }).then(()=>console.log("GOT")).catch((err)=> console.log(err,"err"))

    }

    componentDidMount () {

        this.refreshList();
    }

    // Noinspection JSCheckFunctionSignatures
    shouldComponentUpdate () {

        return true;

    }

    handleMatch = (flag) => {
        this.setState({"found_match": flag});
        axios.get(backend+"connect/searchfordata/",{
            format: "json",
             params:{
                 id_list: JSON.stringify(this.state.dataList["Teachers"]),
        },})
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    handleChange = (value) => {
        this.setState({"searchTerm": value});
    }

    refreshList = () => {
        axios.get(backend+"connect/searchfor/java",{
            format: "json"
          })
            .then((res) => this.setState({"dataList": res.data}))
            .catch((err) => console.log(err));
    };

      render () {
          console.log(this.props.searchTerm);
          if (!this.state.found_match) {

              return (
                  <div >
                      <div>
                          <h1 className="col-sm-5 col-md-5">
                              {" "}
                              Skill Search

                              {" "}
                          </h1>

                          <Autocomplete
                              onChange={this.handleChange}
                              onMatch={this.handleMatch}
                              searchTerm={this.state.searchTerm}
                              suggestions={this.state.temp_l}
                          />
                      </div>

                      <div className="float-centre">
                          Loading...
                      </div>
                  </div>
              );

          }
          else{
              return (
                  <div>
                      <div>
                          <h1 className="col-sm-5 col-md-5">
                              {" "}

                              Skill Search

                              {" "}
                          </h1>

                          <Autocomplete
                              onChange={this.handleChange}
                              searchTerm={this.state.searchTerm}
                              suggestions={this.state.temp_l}
                          />
                      </div>

                      <div>
                          <CardsP
                              batch="CSE, First Year"
                              description={`${this.state.dataList["First_Name"]}  dont mess with me`}
                              insta={"https://www.instagram.com/"+"guy.pixelated/"}
                              name={this.state.dataList[0]["Last_Name"]}
                          />
                      </div>
                  </div>
            );
          }
      }
}

export default Ask;