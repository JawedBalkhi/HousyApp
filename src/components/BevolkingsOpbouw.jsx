import React from 'react'
import Select from 'react-select'
import { Container, Col, Row } from 'reactstrap'

export default class BevolkingsOpbouw extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: null
        }
    }



    render() {
        if(this.state.chartData === null)
            return <Container>
                Loading...
            </Container>
        
        return <Container>
            geladen
        </Container>
    }

}