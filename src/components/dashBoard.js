import React, { Component } from 'react'
import './dashBoard.css';
import {Col, Row, Container} from 'react-bootstrap';
import WB from './widgetBar';
import WD from './widgetDoughnut';
import TextWidget from './TextWidget';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class dashBoard extends Component {
    
    constructor() {
        super();
        this.state = {
            dropdownOptions: [],
            items: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            socialSource: null,
            emailSource: null,
            sourceArr: [],
            userArr: []
        }
    }

    getData = arg => {
        const arr = this.state.items;
        const arrLen = arr.length;
        
        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let socialSource = 0;
        let emailSource = 0;
        let selectedValue = null;
        let sourceArr = [];
        let userArr = [];

        for (let i = 0; i < arrLen; i++) {
            if (arg === arr[i]["month"]) {

                organicSource = arr[i].organic_source;
                directSource = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                pageViews = arr[i].page_views;
                users = arr[i].users;
                newUsers = arr[i].new_users;
                socialSource = arr[i].social_source;
                emailSource = arr[i].email_source;
                sourceArr.push(
                        {
                        label: "Organic Source",
                        value: arr[i].organic_source
                        },
                        {
                        label: "Direct Source",
                        value: arr[i].direct_source
                        },
                        {
                        label: "Referral Source",
                        value: arr[i].referral_source
                        }
                )
                userArr.push(
                    {
                    label: "Users",
                    value: arr[i].users
                    },
                    {
                    label: "New Users",
                    value: arr[i].new_users
                    },
                )

            }

        }
        selectedValue=arg;

        this.setState({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            socialSource: socialSource,
            emailSource: emailSource,
            sourceArr: sourceArr,
            userArr: userArr
            
        });
    }

    updateDashboard = event => {
        this.getData(event.value);
        this.setState({ selectedValue: event.value}, () => {
            console.log(this.state.users)
        }
        );
    };


    componentDidMount(){
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
                // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );


            });
    }

    render() {

        return (
            <div>
                <Container fluid>
                    <Row className="TopHeader">
                        <Col>
                        DashBoard
                        </Col>
                        <Col>
                        <Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="Maindashboard">
                        <Col>
                        <TextWidget Title="Organic Source" value={this.state.organicSource}/>
                        </Col>
                        <TextWidget Title="Direct Source" value={this.state.directSource}/>
                        <Col>
                        <TextWidget Title="Referral Source" value={this.state.referralSource}/>
                        </Col>
                        <Col>
                        <TextWidget Title="Social Source" value={this.state.socialSource}/>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <TextWidget Title="Page Views" value={this.state.pageViews}/>
                        </Col>
                        <Col>
                        <TextWidget Title="Users" value={this.state.users}/>
                        </Col>
                        <Col>
                        <TextWidget Title="New Users" value={this.state.newUsers}/>
                        </Col>
                        <Col>
                        <TextWidget Title="Email Source" value={this.state.emailSource}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WB Title="Source Comparison" data={this.state.sourceArr}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <WD Title="User Comparison" data={this.state.userArr}/>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        )
    }
}

export default dashBoard;
