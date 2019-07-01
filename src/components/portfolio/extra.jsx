import React from 'react';
import MiniCard from './cards/mini';
import DialogPublication from './cards/dialogPublication';
import DialogAward from './cards/dialogAward';

class Extra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPublishDialog: false,
      openAwardDialog: false,
      title: '',
      company: '',
      date: '',
      website: '',
      text: '',
    };
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogOpen(type, chipTitle) {
    if (type === 'publications') {
      this.setState({
        openPublishDialog: true,
        title: chipTitle,
        company: 'random cmpan',
        date: 'dd/mm/yyyy',
        website: 'websitename.com',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod afkljda lajdlfjkl aljdflajdfj ajklsfdj; ajkdfla dkf',

      });
    } else if (type === 'awards') {
      this.setState({
        openAwardDialog: true,
        title: chipTitle,
        company: 'random cmpan',
        date: 'dd/mm/yyyy',
        website: 'websitename.com',
        text:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod afkljda lajdlfjkl aljdflajdfj ajklsfdj; ajkdfla dkf',
      });
    }
  }

  handleDialogClose() {
    this.setState({
      openAwardDialog: false,
      openPublishDialog: false,
    });
  }

  render() {
    const {
      title, openPublishDialog, openAwardDialog, company, date, website, text,
    } = this.state;
    return (
      <div className="portfolioPage extrasPage">
        <div className="portfolioPageTitle floodFill">
          Extra
          {"'"}
          s
        </div>
        <div className="portfolioFlatContainer">
          <MiniCard title="awards" items={['Award 1', 'Award 2']} handleDialogOpen={this.handleDialogOpen} />
          <MiniCard title="publications" items={['Publication 1', 'Publication 2']} handleDialogOpen={this.handleDialogOpen} />
          <MiniCard title="skills" items={['Skill 1', 'Skill 2']} handleDialogOpen={this.handleDialogOpen} />
          <MiniCard title="languages" items={['Language 1', 'Language 2']} handleDialogOpen={this.handleDialogOpen} />
        </div>
        <DialogPublication
          title={title}
          handleDialogClose={this.handleDialogClose}
          open={openPublishDialog}
          publisher={company}
          date={date}
          website={website}
        >
          { text }
        </DialogPublication>
        <DialogAward
          title={title}
          handleDialogClose={this.handleDialogClose}
          open={openAwardDialog}
          awarder={company}
          date={date}
        >
          { text }
        </DialogAward>
        <div className="miniLine" />
      </div>
    );
  }
}

export default Extra;
