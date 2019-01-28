import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {getNodeInfo, writeApi} from '../actions/actions'


const styles = theme => ({
    root: {
        overflowX: 'auto',
    },
});

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.init();
    }
    render (
        { classes } = this.props
    ){
    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>DATA CENTER</TableCell>
                        <TableCell>ONLINE</TableCell>
                        <TableCell>DOWN</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.nodeList.map((nodes, id) => {
                        return (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">{nodes.dc}</TableCell>
                                <TableCell>{nodes.mode}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
}

const mapStateToProps = (state, ownProps) => {
    return {
        drawerOpen: state.NavigationReducer.drawerOpen,
        page: state.NavigationReducer.page,
        dcList: state.app.dcList,
        nodeList: state.app.nodeList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    init: () => {
        dispatch(getNodeInfo('http://52.53.185.6:8080/demo/nodefull'))
    },

    drawerToggle: (drawerOpen) => {
        dispatch(drawerToggle(drawerOpen))
    },
    changeScreen: (page) => {
        dispatch(changeScreen(page))
        dispatch(drawerToggle(false))
    }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Dashboard))
export default DashboardContainer
