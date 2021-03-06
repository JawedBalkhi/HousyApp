
import React from 'react'
import Select from 'react-select'
import { Container, Col, Row, Alert } from 'reactstrap'
import { HorizontalBar, Doughnut } from 'react-chartjs-2'

const defaultPopulationData = {
    labels: [],
    datasets: [
        {
            label: 'man',
            backgroundColor: 'rgba(112, 174, 224, 0.9)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 2,
            data: []
        },
        {
            label: 'vrouw',
            backgroundColor: 'rgba(248, 185, 212 , 0.9)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 2,
            data: []
        }
    ]
}

const defaultPopulationPyramidOptions = {
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
                callback: value => { return value.includes('100') ? value.toString().replace('_',' - ') + ' +' :value.toString().replace('_',' - ')}
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

const defaultBurgstaatData = {
    datasets: [],
    labels: [ 'ongehuwd', 'gehuwd', 'gescheiden', 'verweduwd' ]
}

const defaultBurgstaatDataset = {
    data: [],
    backgroundColor: [ 'rgba(0, 0, 255, 0.8)', 'rgba(255, 215, 0, 1)', 'rgba(191, 191, 191, 1)', 'rgba(46, 49, 49, 1)' ]
}

const selectedManColor = 'rgba(83, 51, 237, 1)'
const unselectedManColor = 'rgba(112, 174, 224, 1)'
const selectedVrouwColor = 'rgba(255, 20, 147, 1)'
const unselectedVrouwColor = 'rgba(248, 185, 212 , 1)'

const sortLabels = (a,b) => {
    if(a === '100')
        return -1
    
    if(b === '100')
        return 1

    const left = parseInt(a.split('_')[0])
    const right = parseInt(b.split('_')[0])

    if(left < right)
        return 1
    
    if (left > right) 
        return -1

    return 0
}

const allowedMunicipalities = [ 'zuidhorn', 'briltil', 'groningen', 'lauwerzeil', 'niekerk', 'kommerzijl', 'aduard'].sort()

export default class BevolkingsOpbouw extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedMunicipality: null,
            selectedYear: null,
            availableYears: [ 2010, 2011, 2012, 2013, 2014, 2015 ],
            availableMunicipalities: [],
            municipalitiesError: null,
            populationError: null,
            chartData: defaultPopulationData,
            populationPyramidOptions: defaultPopulationPyramidOptions,
            selectedIndices: [],
            manBurgstaatData: null,
            vrouwBurgstaatData: null,
            loading: false,
            burgStaatLoading: false
        }

        this.fetchPopulationData = this.fetchPopulationData.bind(this)
        this.onAgegroupSelect = this.onAgegroupSelect.bind(this)
        this.fetchBurgerlijkeStaat = this.fetchBurgerlijkeStaat.bind(this)
        this.updateBurgerlijkeStaat = this.updateBurgerlijkeStaat.bind(this)
    }

    componentDidMount() {
        fetch('/woonplaatsen')
            .then(res => res.json())
            .then(json => json.data.woonplaatsen.filter(val => allowedMunicipalities.includes(val)))
            .then(data => {
                this.setState({ availableMunicipalities: data, municipalitiesError: null })
            })
            .catch(err => {
                this.setState({ chartData: defaultPopulationData, municipalitiesError: `Het is momenteel niet mogelijk woonplaatsten op te halen: ${err.message}` })
            })
    }

    fetchBurgerlijkeStaat() {
        if(!this.state.selectedMunicipality || !this.state.selectedYear)
            return

        this.setState({ burgStaatLoading: true })    

        if(this.state.selectedIndices.length < 1) {
            fetch(`/burgstaat/${this.state.selectedMunicipality}/${this.state.selectedYear}`)
                .then(res => res.json())
                .then(json => json.data)
                .then(data => {
                    console.log(data)
                    return data
                })
                .then(this.updateBurgerlijkeStaat)
                .catch(_ => this.setState({ burgStaatLoading: false }))
        } else {
            const ageGroups = this.state.selectedIndices.map(index => {
                const label = this.state.chartData.labels[index]

                if(label.includes('+'))
                    return { min: 100, max: 150 }
                
                const ageArray = label.split('_')
                return { min: ageArray[0].trim(), max: ageArray[1].trim()}
            })

            Promise.all(
                ageGroups.map(ageRange => (fetch(`/burgstaat/${this.state.selectedMunicipality}/${this.state.selectedYear}?minAge=${ageRange.min}&maxAge=${ageRange.max}`)
                                            .then(res => res.json())
                                            .then(json => json.data)))
            ).then(ageGroupResults =>{
                const data = ageGroupResults.reduce((acc, ageGroup ) => {
                    const newAcc = { ...acc }
                    Object.keys(ageGroup).map(key => {
                        newAcc[key].m = ageGroup[key].m + acc[key].m
                        newAcc[key].v = ageGroup[key].v + acc[key].v
                    })

                    return newAcc
                }, {
                    "gehuwd": { "m": 0, "v": 0 },
                    "ongehuwd": { "m": 0, "v": 0 },
                    "gescheiden": { "m": 0, "v": 0 },
                    "verweduwd": { "m": 0, "v": 0 }
                })
                return data
            })
            .then(this.updateBurgerlijkeStaat)
            .catch(_ => this.setState({ burgStaatLoading: false }))
        } 
    }

    updateBurgerlijkeStaat(data) {
        const manBurgstaatData = Object.assign({}, defaultBurgstaatData)
        manBurgstaatData.datasets = [{
            ...defaultBurgstaatDataset,
            data: defaultBurgstaatData.labels.map(key => data[key].m)
        }]

        const vrouwBurgstaatData = Object.assign({}, defaultBurgstaatData)
        vrouwBurgstaatData.datasets = [{
            ...defaultBurgstaatDataset,
            data: defaultBurgstaatData.labels.map(key => data[key].v)
        }]

        this.setState({ manBurgstaatData, vrouwBurgstaatData, burgStaatLoading: false })
    }

    fetchPopulationData(req) {
        const { municipality, year } = req

        if(!municipality || !year)
            return
            
        this.setState({ loading: true })
        fetch(`/opbouw/${municipality}/${year}`)
            .then(res => res.json())
            .then(json => json.data)
            .then(data => {
                //Get values
                const chartData = Object.assign({}, defaultPopulationData)
                const populationPyramidOptions = Object.assign({}, defaultPopulationPyramidOptions)
                const labels = Object.keys(data.man).map(key => key.replace('-', '_')).sort(sortLabels)

                const manDataset = Object.assign({}, defaultPopulationData.datasets[0])
                manDataset.data = Object.keys(data.man).sort(sortLabels).map(key => ([0, data.man[key]]))

                const vrouwDataset = Object.assign({}, defaultPopulationData.datasets[1])
                vrouwDataset.data = Object.keys(data.vrouw).sort(sortLabels).map(key => ([-data.vrouw[key], 0]))

                const extremeXAxisValue = Object.keys(data.vrouw).sort(sortLabels).map(vrouwKey => data.vrouw[vrouwKey]).concat(Object.keys(data.man).sort(sortLabels).map(manKey => data.vrouw[manKey])).reduce((acc, cur) => { return cur > acc ? cur : acc }, 0)

                //Write to chart
                chartData.labels = labels
                chartData.datasets = [ manDataset, vrouwDataset ]

                //Set min- and max value
                const marge = 1.15
                populationPyramidOptions.scales.xAxes[0].ticks.min = Math.ceil((marge * extremeXAxisValue)/10) * -10
                populationPyramidOptions.scales.xAxes[0].ticks.max = Math.ceil((marge * extremeXAxisValue)/10) * 10

                //Update state
                this.setState({ 
                    selectedIndices: [], 
                    populationError: null, 
                    chartData, 
                    populationPyramidOptions,
                    loading: false 
                }, this.fetchBurgerlijkeStaat)
            })
            .catch(err => {
                this.setState({ 
                    selectedIndices: [], 
                    chartData: 
                    defaultPopulationData, 
                    populationError: `Er is iets fout gegaan bij het ophalen van de bevolkingsdata: ${err.message}`,
                    manBurgstaatData: null,
                    vrouwBurgstaatData: null,
                    loading: false
                })
            })
    }

    onAgegroupSelect(e) {
        if(!e || !e[0])
            return

        const index = e[0]._index
        let indices = [ ...this.state.selectedIndices ]

        if(indices.includes(index))
            indices = indices.filter(value => value !== index)
        else
            indices.push(index)


        const chartData = Object.assign({}, this.state.chartData)
        chartData.datasets = chartData.datasets.map(dataset => {
            return {
                ...dataset,
                backgroundColor: dataset.data.map((_, i) => {
                    if(dataset.label === 'man')
                        return indices.includes(i) ? selectedManColor : unselectedManColor
                    
                    return indices.includes(i) ? selectedVrouwColor : unselectedVrouwColor
                })
            }
        })

        this.setState({ selectedIndices: indices, chartData }, this.fetchBurgerlijkeStaat)
    }

    render() {
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
                            options={this.state.availableMunicipalities.map(municipality => {
                                const label = municipality.charAt(0).toUpperCase() + municipality.slice(1)
                                return {name: municipality, label } 
                        
                            })}
                            onChange={e => { this.setState({ selectedMunicipality: e.name }); this.fetchPopulationData({ municipality: e.name, year: this.state.selectedYear})}}
                            value={this.state.selectedMunicipality ? {'name': this.state.selectedMunicipality, label: this.state.selectedMunicipality.charAt(0).toUpperCase() + this.state.selectedMunicipality.slice(1)} : null}
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


            {!this.state.loading && this.state.chartData && this.state.chartData.datasets[0].data.length > 1 && 
                <Row className="mb-2" >
                    <Col>
                        <HorizontalBar 
                            data={this.state.chartData}
                            options={this.state.populationPyramidOptions}
                            onElementsClick={this.onAgegroupSelect}
                        />
                        
                        Selecteer een of meerdere leeftijdsgroepen in de grafiek hierboven om een overzicht te krijgen van de burgerlijke staat binnen die leeftijdsgroep(en).
                    </Col>
                    
                </Row>
            }

            {(this.state.loading || this.state.burgStaatLoading) && <Row> Laden... </Row>}


            {!this.state.burgStaatLoading && !this.state.loading && this.state.manBurgstaatData && this.state.vrouwBurgstaatData && <hr className="mt-3" />}

            {!this.state.loading && this.state.manBurgstaatData && this.state.vrouwBurgstaatData &&
                <Row className="mt-2" style={{opacity: this.state.burgStaatLoading ? 0.3 : 1}}>
                    <Col className="text-center border-right">
                        <h4>Burgerlijkestaat vrouwen</h4>
                        <Doughnut data={this.state.vrouwBurgstaatData} />
                    </Col>
                    <Col className="text-center">
                        <h4>Burgerlijkestaat mannen</h4>
                        <Doughnut data={this.state.manBurgstaatData} />
                    </Col>
                </Row>
            }

            
        </Container>
    }

}