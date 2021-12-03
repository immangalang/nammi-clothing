import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Nav = styled.div`
  width: 100%;
  height: 50px;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  justify-content: spaced-between;
  padding: 10px 20px;
`;

const Left = styled.div`
  flex: 1;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: 600;
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const Input = styled.input`
  border: none;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Items = styled.div`
  font-size: 14px;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <Nav>
      <Container>
        <Left>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>NAMMI</Logo>
          </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder=" Search" />
            <Search style={{ color: 'gray' }} />
          </SearchContainer>
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Items>Sign Up</Items>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Items>Log In</Items>
          </Link>
          <Items>
            <Badge badgeContent={1} color="secondary">
              <ShoppingCart />
            </Badge>
          </Items>
        </Right>
      </Container>
    </Nav>
  );
};

export default Navbar;
