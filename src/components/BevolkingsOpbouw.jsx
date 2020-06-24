import React from 'react'
import Select from 'react-select'
import { Container, Col, Row, Alert } from 'reactstrap'

export default class BevolkingsOpbouw extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: null,
            selectedMunicipality: null,
            selectedYear: null,
            availableYears: [ 2017, 2018, 2019 ],
            availableMunicipalities: [],
            municipalitiesError: null,
            populationError: null
        }

        this.fetchPopulationData = this.fetchPopulationData.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:3000/Location')
            .then(res => res.json())
            .then(data => {
                const availableMunicipalities = data.map(municipality => municipality.name)
                this.setState({ availableMunicipalities, municipalitiesError: null })
            })
            .catch(err => {
                this.setState({ municipalitiesError: `Het is momenteel niet mogelijk woonplaatsten op te halen: ${err.message}` })
            })
    }

    fetchPopulationData(req) {
        const { municipality, year } = req

        if(!municipality || !year)
            return
            
        fetch(`http://localhost:3000/Bevolkingsopbouw${municipality}${year}`)
            .then(res => res.json())
            .then(data => {
                const numbers = Object.keys(data.man).map(key => key)
                console.log('populationData: ', data)
            })
            .catch(err => {
                console.log('error: ', err)
                this.setState({ populationError: `Er is iets fout gegaan bij het ophalen van de bevolkingsdata: ${err.message}`})
            })
    }

    render() {
        if(this.state.municipalitiesError)
            return <Container>
                <h2 className="mt-2">
                    Bevolkingsopbouw
                </h2>
                <p>
                    Gebruik deze pagina om inzicht te krijgen in de bevolkingsopbouw in uw woonplaats.
                </p>
                <Alert color="danger" className="mt-2">{this.state.municipalitiesError}</Alert>
            </Container>
        
        return <Container>
            <h2 className="mt-2">
                Bevolkingsopbouw
            </h2>
            <p>
                Gebruik deze pagina om inzicht te krijgen in de bevolkingsopbouw in uw woonplaats.
            </p>
            <Row>
                <Col>
                    <Row>Woonplaats</Row>
                    <Row>
                        <Select 
                            className="w-75"
                            options={this.state.availableMunicipalities.map(municipality => ( {name: municipality, label: municipality} ))}
                            onChange={e => { this.setState({ selectedMunicipality: e.name }); this.fetchPopulationData({ municipality: e.name, year: this.state.selectedYear})}}
                            value={this.state.selectedMunicipality ? {'name': this.state.selectedMunicipality, label: this.state.selectedMunicipality} : null}
                            placeholder="Selecteer een woonplaats"
                        />
                    </Row>
                </Col>
                <Col>
                    <Row>Jaar</Row>
                    <Row>
                        <Select 
                            className="w-50"
                            options={this.state.availableYears.map(municipality => ( {name: municipality, label: municipality} ))}
                            onChange={e => { this.setState({ selectedYear: e.name }); this.fetchPopulationData({ municipality: this.state.selectedMunicipality, year: e.name})}}
                            value={this.state.selectedYear ? {'name': this.state.selectedYear, label: this.state.selectedYear} : null}
                            placeholder="Selecteer een jaar"
                        />
                    </Row>
                </Col>
            </Row>

            <hr className="mt-4" />
            
            {this.state.populationError && 
                <Row>
                    <Alert color="danger" className="mt-1 w-75">{this.state.populationError}</Alert>
                </Row>
            }
            
        </Container>
    }

}