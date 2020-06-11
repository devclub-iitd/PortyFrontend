import React from 'react';
import PropTypes from 'prop-types';
import AwardCard from './cards/mini/award';
import LanguageCard from './cards/mini/language';
import PublicationCard from './cards/mini/publication';
import SkillCard from './cards/mini/skills';
import DialogPublication from './cards/dialogPublication';
import DialogAward from './cards/dialogAward';
import Title from './Title';

class Extra extends React.Component {
    constructor(props) {
        super(props);
        const { awards, publications, languages, skills } = this.props;
        this.state = {
            openPublishDialog: false,
            openAwardDialog: false,
            userAwards: awards,
            userPublication: publications,
            userLanguages: languages,
            userSkills: skills,
            title: '',
            company: '',
            date: '',
            website: '',
            text: '',
        };
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }

    handleDialogOpen(type, chip) {
        if (type === 'publications') {
            this.setState({
                openPublishDialog: true,
                title: chip.name,
                company: chip.publisher,
                date: chip.releaseDate,
                website: chip.website,
                text: chip.summary,
            });
        } else if (type === 'awards') {
            this.setState({
                openAwardDialog: true,
                title: chip.title,
                company: chip.awarder,
                date: chip.date,
                text: chip.details,
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
            title,
            openPublishDialog,
            openAwardDialog,
            company,
            date,
            website,
            text,
            userAwards,
            userLanguages,
            userSkills,
            userPublication,
        } = this.state;

        let AwardDisp;
        let PublicDisp;
        let SkillDisp;

        

        if (userAwards.length > 0 && userAwards[0].title !== '') {
            AwardDisp = (
                <AwardCard
                    title="awards"
                    items={userAwards}
                    handleDialogOpen={this.handleDialogOpen}
                />
            );
        }
        if (userPublication.length > 0 && userPublication[0].name !== '') {
            PublicDisp = (
                <PublicationCard
                    title="publications"
                    items={userPublication}
                    handleDialogOpen={this.handleDialogOpen}
                />
            );
        }
        if (userSkills.length > 0 && userSkills[0].name !== '') {
            SkillDisp = <SkillCard title="skills" items={userSkills} />;
        }

        return (
            <div className="portfolioPage extrasPage">
                <div className="portfolioPageTitle floodFill"><Title title="Extras" className="about-title"/></div>
                <div className="portfolioFlatContainer">
                    {AwardDisp}
                    {PublicDisp}
                    {SkillDisp}
                    <LanguageCard
                        title="languages"
                        items={userLanguages}
                        handleDialogOpen={this.handleDialogOpen}
                    />
                </div>
                <DialogPublication
                    title={title}
                    handleDialogClose={this.handleDialogClose}
                    open={openPublishDialog}
                    publisher={company}
                    date={date}
                    website={website}
                >
                    {text}
                </DialogPublication>
                <DialogAward
                    title={title}
                    handleDialogClose={this.handleDialogClose}
                    open={openAwardDialog}
                    awarder={company}
                    date={date}
                >
                    {text}
                </DialogAward>
            </div>
        );
    }
}

Extra.propTypes = {
    awards: PropTypes.oneOfType([PropTypes.object]).isRequired,
    publications: PropTypes.oneOfType([PropTypes.object]).isRequired,
    languages: PropTypes.oneOfType([PropTypes.object]).isRequired,
    skills: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Extra;
