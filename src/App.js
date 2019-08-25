import './app.css';
import React from 'react';
import { Container, Header, Grid, Form, Icon, Modal } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';


class App extends React.Component {

  state = {
    file: null,
    numPages: 0,
    pageNumber: 1,
    private: "false"
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  nextPage = (val) => {

    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 >= this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + val;
    }
    if(nextPageNumber>3){
      nextPageNumber=3;
    }

    this.setState({
      pageNumber: nextPageNumber
    });
  }

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <Container>
        <br />
        <Header textAlign="center">PDF Preview</Header>
        <Form>
          <input type="file" onChange={this.onFileChange}>
          </input>
        </Form>
        <Grid centered columns={2}>
          {/* arrow alternate circle left  arrow circle right*/}
          <div className={"payment-info "+this.state.private}>Veuillez payer pour continuer</div>
          <Icon bordered name='arrow left' style={{marginTop:"20%"}} onClick={()=>this.nextPage(-1)} />
          <Grid.Column textAlign="center"  className="book-border">

            <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} noData={<h4>Please select a file</h4>}>
              <Page pageNumber={pageNumber} />
            </Document>

            {this.state.file ? <p>Page {pageNumber} of {numPages}</p> : null}
          </Grid.Column>
          <Icon bordered name='arrow right' style={{marginTop:"20%"}} onClick={()=>this.nextPage(1)} />
        </Grid>
      </Container>
    );
  }
}

export default App;