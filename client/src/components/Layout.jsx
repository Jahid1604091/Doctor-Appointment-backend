import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './Sidebar'
import styled from 'styled-components'

export default function Layout({children}) {
  return (
    <Wrapper>
        <div className='d-flex justify-content-between'>
                <div className="sidebar ">
                    <Sidebar/>
                </div>

                <div className="main">
                    <div className="">
                        Navbar
                    </div>
                    <div className="">
                        {children}
                    </div>
                </div>
           
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
    .sidebar{
        width: 20vw;
        border: 1px solid red;
    }
    .main{
        width: 80vw;
        border: 5px solid green;
    }
    

`