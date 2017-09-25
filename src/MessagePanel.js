import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Config} from './Configs.js';
//import logo from './logo.svg';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import FlatButton from 'material-ui/FlatButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RadioButton from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import {Collapse} from 'react-collapse';

import IconDown from './Images/down_icon.png';
import IconUp from './Images/up_icon.png';

import {WordingInfo} from './Localized/WordingInfo.js'
import {MSGSteateInfo,SendInfo,FeedbackInfo} from './Localized/MessageInfo.js'

const MSGSteate={Quality:'Quality',Feedback:'Feedback',Problem:'Problem',Thank:'Thank',SendMSG:'SendMSG',SendFail:'SendFail'};
const _isLocal='EN';

const style = {marginRight:20,};
const RaisedBtnBoxStyle={paddingTop:'10px',margin:'0px 5px 0px 5px'};

class MessagePanel extends Component 
{
    // state = {open:false,MessageState:MSGSteate.Quality,anchorOrigin:{anchorOrigin:''}};

    constructor(props)
    {
      super(props);
      this.state= {open:false,MessageState:MSGSteate.Quality,anchorOrigin:{anchorOrigin:''}};
    }

    render() 
    {
      return (
              <div className='App' >
                {this.DisplayMessage(this.state.MessageState)}
                <div className='App-header' >
                  {/* <img src={logo} className='App-logo' alt='logo' /> */}
                  <h2>Ooca Appointment</h2>
                </div>
                <p className='App-intro' onClick={()=>this.setState({open:true})}>
                  Click Show Message.
                </p>       
              </div>
            );
    }

    DisplayMessage(_state)
    {
      const _isActive=(this.state.MessageState.match(/(Quality|Feedback|SendMSG|SendFail)/i)?true:false);
      //1 (_state===MSGSteate.Feedback)||(_state===MSGSteate.SendMSG)||(_state===MSGSteate.Quality)
      //2 (_state===MSGSteate.Problem)||(_state===MSGSteate.Thank)

      return <MuiThemeProvider>            
              <Dialog actions={undefined} modal={false} open={this.state.open} bodyStyle={{padding:'20px 10px 20px 10px'}}
                      onRequestClose={this.handleClose} contentStyle={{width:'90%'}} style={{}}>

              <Collapse isOpened={_isActive}>{this.ActiveOnState(_state)}</Collapse>
              <Collapse isOpened={!_isActive}>{this.ActiveOnState(_state)}</Collapse>     
              </Dialog>            
            </MuiThemeProvider>
    }
  
    handleOpen = () => {this.setState({open:true});};
    handleClose = () => {this.setState({open:false,MessageState:MSGSteate.Quality,anchorOrigin:{anchorOrigin:''}});};

    handMSGState(_state)
    {
      switch(_state)
      {
        case MSGSteate.Quality :{SendInfo.provider_comment_call=''}break;
        case MSGSteate.Feedback :{SendInfo.provider_comment_call=''}break;
        case MSGSteate.Problem :{SendInfo.provider_comment_call=''}break;
        case MSGSteate.Thank :{SendInfo.provider_comment_call=''}break;
      }    
      this.setState({MessageState:_state})
    }

    setAnchor = (positionElement, position) => 
    {
      const {anchorOrigin} = this.state;
      anchorOrigin[positionElement] = position;
  
      this.setState({anchorOrigin:anchorOrigin,});
    };

    ActiveOnState(_state)
    {
      switch(_state)
      {
        case MSGSteate.Quality : 
             { 
               return(<div className='App-MessageBox' style={{overflowX:'hidden'}}>
                        <div style={{paddingTop:'20px',marginBottom:'30px'}}>
                          <label style={{margin:'10px',width:'100%'}}>{MSGSteateInfo.Quality[_isLocal]}</label>
                        </div>
                        <div style={{marginBottom:'25px',height:'100%',paddingLeft:'20px',marginLeft:'15px'}}>
                          <FloatingActionButton mini={true} style={style} 
                            onClick={()=>{FeedbackInfo.rating=true; this.handMSGState(MSGSteate.Feedback)}}>
                            <img src={IconUp} className='App-icon' style={{margin:'-15px',height:'70px'}} alt='Like' />
                          </FloatingActionButton>
                          <FloatingActionButton mini={true} style={style} 
                            onClick={()=>{FeedbackInfo.rating=false; this.handMSGState(MSGSteate.Problem)}}>
                            <img src={IconDown} className='App-icon' style={{margin:'-15px',height:'70px'}} alt='UnLink' />
                          </FloatingActionButton>
                        </div>
                      </div>);
            } 

         case MSGSteate.Feedback : 
            { 
              return(<div className='App-MessageBox' style={{overflowX:'hidden'}}>
                      <div ><label style={{margin:'10px',width:'100%'}}>{MSGSteateInfo.Feedback[_isLocal]}</label></div>
                      <div style={{textAlign:'left'}}>
                      <TextField hintText={WordingInfo.Recommend[_isLocal]} floatingLabelText={WordingInfo.Feedback[_isLocal]}
                                 multiLine={true} fullWidth={true} rows={2}/>
                      </div>
                      <div style={RaisedBtnBoxStyle}>
                        <RaisedButton label={WordingInfo.Skip[_isLocal]} fullWidth={true} style={style} onClick={()=>{this.SendFeedback(); this.handMSGState(MSGSteate.SendMSG)}}/>
                      </div>
                      <div style={RaisedBtnBoxStyle}>
                        <RaisedButton label={WordingInfo.Submit[_isLocal]} primary={true} fullWidth={true} style={style} onClick={()=>{this.SendFeedback(); this.handMSGState(MSGSteate.SendMSG)}}/>
                      </div>
                     </div>);
           } 

         case MSGSteate.Problem : 
             { 
               return (<div className='App-MessageBox' style={{overflowX:'hidden'}}>
                        <div><label style={{margin:'10px',width:'100%'}}>{MSGSteateInfo.Problem[_isLocal]}</label></div>
                        <div style={{paddingTop:'15px',marginBottom:'25px'}}>
                          <div style={{width:'50%',minWidth:'250px',textAlign:'-webkit-left'}}>
                            <RadioButton onClick={this.setAnchor.bind(this,'vertical','top')}
                              label={WordingInfo.VideoProblem[_isLocal]} checked={this.state.anchorOrigin.vertical==='top'}/>

                            <RadioButton onClick={this.setAnchor.bind(this,'vertical','center')}
                              label={WordingInfo.VideoConnection[_isLocal]} checked={this.state.anchorOrigin.vertical==='center'}/>

                            <RadioButton onClick={this.setAnchor.bind(this,'vertical','bottom')}
                              label={WordingInfo.Others[_isLocal]} checked={this.state.anchorOrigin.vertical==='bottom'}/>
                         </div>
                         {(this.state.anchorOrigin.vertical==='bottom')?
                          <div style={{textAlign:'left',marginBottom:'0px'}}>
                            <TextField hintText={WordingInfo.Recommend[_isLocal]} floatingLabelText={WordingInfo.Feedback[_isLocal]}
                                      multiLine={true} fullWidth={true} rows={2}/>
                          </div>:undefined}
                        </div>
                        <div style={RaisedBtnBoxStyle}>
                          <RaisedButton label={WordingInfo.Skip[_isLocal]} fullWidth={true} style={style} onClick={()=>{this.SendFeedback(); this.handMSGState(MSGSteate.SendMSG)}}/>
                        </div>
                        <div style={RaisedBtnBoxStyle}>
                          <RaisedButton label={WordingInfo.Submit[_isLocal]} primary={true} fullWidth={true} style={style} onClick={()=>{this.SendFeedback(); this.handMSGState(MSGSteate.SendMSG)}}/>
                        </div>
                      </div>);
             } 
        
        case MSGSteate.SendMSG :
        {
          return (<div className='App-MessageBox' style={{overflowX:'hidden'}}>
                    <div style={{paddingTop:'20px',marginBottom:'30px'}}>
                      <label style={{margin:'10px',width:'100%'}}>{MSGSteateInfo.SendMSG[_isLocal]}</label>
                    </div>
                    <div style={{padding:'0px 10px 0px 10px',marginBottom:'30px'}}>
                        <LinearProgress mode='indeterminate' />
                    </div>
                    <div style={{width:'100%',paddingLeft:'10px'}}>
                        <RaisedButton label={WordingInfo.Continue[_isLocal]} primary={true} style={style} onClick={()=>this.handMSGState(MSGSteate.Thank)}/>
                    </div>
                  </div>);
        }

        case MSGSteate.Thank : 
             { 
               return (<div className='App-MessageBox' style={{overflowX:'hidden'}}>
                          <div style={{paddingTop:'20px',marginBottom:'30px'}}>
                            <label style={{margin:'10px',width:'100%'}}>{MSGSteateInfo.Thank[_isLocal]}</label>
                          </div>
                          <div style={{width:'100%',paddingLeft:'10px'}}>
                            <RaisedButton label={WordingInfo.Continue[_isLocal]} primary={true} style={style} onClick={this.handleClose}/>
                            <RaisedButton label={WordingInfo.CallBack[_isLocal]} primary={true} style={style} onClick={this.handleClose}/>
                          </div>
                       </div>);
             } 
        default : { }
      }
    }

    SendFeedback(_id=1) 
    {
        const Feedback_API=`${Config().api_feedback}/${_id}/provider-feedback`;
        console.log("FeedbackInfo :",FeedbackInfo,' api : ',Feedback_API); 
        const header = {'Content-Type':'application/json','Authorization':`Bearer${'jwt token'}`};
        //Authorization':`Bearer${'jwt token'}`

        const request = axios({url:Feedback_API,method:'POST',headers:header,data:FeedbackInfo,dataType:'json',}); 
  
        request.then((response)=> 
        {
          console.log("[API] FeedbackInfo : ", response);
          if(this.state.MessageState===MSGSteate.SendMSG)
             this.handMSGState(MSGSteate.Thank);
        }).catch((error)=> 
        {
          console.log("FeedbackInfo fail", error);
          if(this.state.MessageState===MSGSteate.SendMSG)
             this.handMSGState(MSGSteate.Thank);
             //this.handMSGState(MSGSteate.Fail);
        })
    }

}

export default MessagePanel;
