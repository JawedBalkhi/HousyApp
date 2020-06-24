
import React from 'react'
import Select from 'react-select'
import { Container, Col, Row, Alert } from 'reactstrap'
import { HorizontalBar } from 'react-chartjs-2'

const defaultPopulationData = {
    labels: [],
    datasets: [
        {
            label: 'man',
            backgroundColor: 'rgba(112, 174, 224, 1)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 2,
            data: []
        },
        {
            label: 'vrouw',
            backgroundColor: 'rgba(248, 185, 212 ,1)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 2,
            data: []
        }
    ]
}

const populationPyramidOptions = {
    title: {
        display: true,
        text: 'Bevolkingsaantal per leeftijdsgroep en geslacht',
        fontSize: 20
    },
    legend: {
        display: true,
        position: 'right'
    },
    scales: {
        yAxes: [{
            stacked: true,
            ticks: {
                callback: value => { return value.toString().replace('_',' - ')}
            }
        }],
        xAxes: [{
            stacked: false,
            ticks: {
                min: -100,
                max: 100,
                callback: value => { return value.toString().replace('-', '') }
            }
        }]
    },
    tooltips: {
        callbacks: {
            label: (tooltipItem, data) => {
                const minMaxArray = tooltipItem.value.replace('[','').replace(']','').replace('-', '').split(',')
                const value = minMaxArray[ minMaxArray[0] !== '0' ? 0 : 1 ]
                return `${data.datasets[tooltipItem.datasetIndex].label}: ${value}` || ''
            }
        }
    }
}

export default class BevolkingsOpbouw extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedMunicipality: null,
            selectedYear: null,
            availableYears: [ 2017, 2018, 2019 ],
            availableMunicipalities: [],
            municipalitiesError: null,
            populationError: null,
            chartData: defaultPopulationData
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
                this.setState({ chartData: defaultPopulationData, municipalitiesError: `Het is momenteel niet mogelijk woonplaatsten op te halen: ${err.message}` })
            })
    }

    fetchPopulationData(req) {
        const { municipality, year } = req

        if(!municipality || !year)
            return
            
        fetch(`http://localhost:3000/Bevolkingsopbouw${municipality}${year}`)
            .then(res => res.json())
            .then(data => {
                //Get values
                const chartData = Object.assign({}, defaultPopulationData)
                const labels = Object.keys(data.man).map(key => key)

                const manDataset = Object.assign({}, defaultPopulationData.datasets[0])
                manDataset.data = Object.keys(data.man).map(key => ([0, data.man[key]])).reverse()

                const vrouwDataset = Object.assign({}, defaultPopulationData.datasets[1])
                vrouwDataset.data = Object.keys(data.vrouw).map(key => {
                    console.log(key, data.vrouw[key])
                    return [-data.vrouw[key], 0]
                }).reverse()

                const extremeXAxisValue = Object.keys(data.vrouw).map(vrouwKey => data.vrouw[vrouwKey]).concat(Object.keys(data.man).map(manKey => data.vrouw[manKey]))
                console.log(extremeXAxisValue)
                //Write to chartData
                chartData.labels = labels.reverse()
                chartData.datasets = [ manDataset, vrouwDataset ]

                //Update state
                this.setState({ populationError: null, chartData })
            })
            .catch(err => {
                this.setState({ chartData: defaultPopulationData, populationError: `Er is iets fout gegaan bij het ophalen van de bevolkingsdata: ${err.message}`})
            })
    }

    render() {
        console.log('State chartData: ', this.state.chartData)
        if(this.state.municipalitiesError)
            return <Container>
                <h2 className="mt-2">
                    Bevolkingsopbouw
                </h2>
                <p>
                    Gebruik deze pagina om inzicht te krijgen in de bevolkingsopbouw van
                    { this.state.selectedMunicipality ? ` ${this.state.selectedMunicipality}!` : ' uw woonplaats!' }
                </p>
                <Alert color="danger" className="mt-2">{this.state.municipalitiesError}</Alert>
            </Container>
        
        return <Container>
            <h2 className="mt-2">
                Bevolkingsopbouw
            </h2>
            <p>
                Gebruik deze pagina om inzicht te krijgen in de bevolkingsopbouw van
                { this.state.selectedMunicipality ? ` ${this.state.selectedMunicipality}!` : ' uw woonplaats!' }
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

            {this.state.chartData && this.state.chartData.datasets[0].data.length > 1 && 
                    <HorizontalBar 
                        data={this.state.chartData}
                        options={populationPyramidOptions}
                    />
            }

            
            
        </Container>
    }

}