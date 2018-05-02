import React, { Component } from 'react';
import logo from './logo.svg';
import $ from "jquery";

class Wiki extends Component {
  constructor() {
    super()
    this.state = {
      link:'#',
      text:'',
      url:''
    }
  }
  componentDidMount() {
    this.showWiki(this.props.name,this)
  }
  componentDidUpdate(prevProps,prevState) {
    if (prevProps.name!==this.props.name)
      this.showWiki(this.props.name,this)
  }
  showWiki = (str,component) => {
        var yql_url = '//en.wikipedia.org/w/api.php';
        var title = "";
        $.ajax({
            url: yql_url,
            data: {
              action: 'query',
              list: 'search',
              srsearch: str,
              format: 'json',
              formatversion: 2
            },
            dataType: "jsonp",
            success: function (data) {
              for (var i = 0; i<10; i++) {
                if (!data.query.search[i].snippet.includes('may refer to')) {
                  title = data.query.search[i].title;
                  component.setState({url:'//en.wikipedia.org/wiki/'+title.replace(/ /g,'_')})
                  $.ajax({
                      url: yql_url,
                      data: {
                        action: 'query',
                        titles: title,
                        prop: 'pageimages',
                        format: 'json',
                        pithumbsize: 90
                      },
                      dataType: "jsonp",
                      success: function (data) {
                          var obj = data.query.pages;
                          for (var key in obj) {
                            if (data.query.pages[key].thumbnail) {
                              component.setState({link:String(data.query.pages[key].thumbnail.source)});
                              break
                            }
                            else {
                              component.setState({link:''});
                            }
                          }

                      },
                      error: function (errorMessage) {
                      }
                  });
                  $.ajax({
                      url: yql_url,
                      data: {
                        action: 'query',
                        format: 'json',
                        prop: 'extracts',
                        exintro: '',
                        explaintext: '',
                        titles: title
                      },
                      dataType: "jsonp",
                      success: function (data) {
                          var obj = data.query.pages;
                          for (var key in obj) {
                              component.setState({text:data.query.pages[key].extract});
                              break
                          }

                      },
                      error: function (errorMessage) {
                      }
                  });
                  break
                }
              }
            },
            error: function (errorMessage) {
            }
        });
        //title = search;
    }
  render() {
    return (
      <div>
      <div className='Wiki'>
      <img src={this.state.link} className='WikiImg'/>
      <p className='WikiText'>{this.state.text}</p>
      </div>
      <a href={this.state.url} target='_blank' className='WikiLink'>More...</a>
      </div>
      );
  }
}

export default Wiki