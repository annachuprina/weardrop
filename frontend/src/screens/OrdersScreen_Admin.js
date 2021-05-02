import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { message, Popconfirm } from 'antd'
import {Form, Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import ItemList from '../components/itemList'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import Status from '../components/status'
import {getOrderById, ordersAction} from '../actions/orderActions'
import { useTranslation } from 'react-i18next'
import {saveAddress} from '../actions/cartAction'
import { Popover, Modal } from 'antd';
import { LinkContainer } from 'react-router-bootstrap'

const OrdersScreen_Admin = ({history}) => {
    //const orderId = match.params.id
    const ordersAdmin = useSelector(state => state.ordersAdmin)
    const {loading, orders, error} = ordersAdmin

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch();
    const { t } = useTranslation(); 

    const messageAdminOnHover = (
        <div>
            <p>In order to view details click on the order</p>
        </div>
    );

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(ordersAction())
        }
        else{
            history.push('/login')
        }
    }, [dispatch, userInfo, history]) 

    const confirmUpdate = (id) => {
        //alert(id);
        //dispatch(deleteProductAction(id))
        //message.success('Click on Yes');
    } 
    const cancelUpdate = (e) => {
        console.log(e);
        //message.error('Click on No');
    }
    const handleViewDetails = (id) =>{
        history.push(`/order/${id}`)
    }
    return (
        <>
            <Row>
                <h3>Orders</h3> 
            </Row>
            {loading ? <Loader loadingVal = {loading}/>: error ? <Message>{error}</Message>  : 
            <>
            <Row  key = "header" className="text_details">
                <Col md={4} className =""><strong>{t('ID.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('USER.1')}</strong></Col>  
                <Col md={2} className =""><strong>{t('TOTAL PRICE.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('PAYMENT STATUS.1')}</strong></Col> 
                <Col md={2} className =""><strong>{t('DELIVERY STTUS.1')}</strong></Col> 
            </Row>
            {orders.map(item => (
                <LinkContainer to={`/order/${item._id}`}>
               <Popover content={messageAdminOnHover} title="How to view order details?" key={item._id}> 
                <Row key={item._id} className = "CardDetails2 details">
                    <Col md={4}>{item._id}</Col>
                    <Col md={2}>{item.user && item.user.firstName} {item.user && item.user.lastName}</Col>
                    <Col md={2}>{item.totalPrice && item.totalPrice}</Col>
                    {
                        item.isPaid == false ? <Col md={2}> <strong>✕</strong></Col> : <Col md={2}> <strong> ✓ </strong></Col>
                    }
                    {
                        item.isDelivered == false ? <Col md={2}> <strong>✕</strong></Col> : <Col md={2}> <strong> ✓ </strong></Col>
                    }
                </Row>
                </Popover>
                </LinkContainer>
            ))}
            </>
           }
        </>
    )
}
export default OrdersScreen_Admin
