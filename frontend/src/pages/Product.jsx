import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UpdateProduct from '../components/UpdateProduct';

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;
const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin: 20px 0;
`;

const Price = styled.span`
    font-weight: 200;
    font-size: 2rem;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-style: 20px;
    font-weight: 300;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0 5px;
    cursor: pointer;
    border: 2px solid black;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-between;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid red;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.1s ease-in-out;

    &:hover {
        background-color: #eeeeee;
    }
`;

const Product = () => {
    let location = useLocation();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    let admin = localStorage.getItem('isAdmin');
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const addItem = {
        userId: userId,
        productId: id,
        quantity: amount,
        size: size,
        color: color,
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    `https://nammi-clothing-api.herokuapp.com/api/products/find/${id}`
                );
                setProduct(res.data);
            } catch {}
        };
        getProduct();
    }, [id]);

    const addToCartHandler = async () => {
        if (!token) {
            alert(`Login first to continue.`);
            window.location.href = 'http://localhost:3000/login';
        } else if (!addItem.color || !addItem.size) {
            alert(`Please complete product details before adding to cart`);
        } else {
            await axios.post(
                `https://nammi-clothing-api.herokuapp.com/api/cart/add/${userId}`,
                addItem,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`Product Added`);
            window.location.reload();
        }
    };

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>{product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color: </FilterTitle>
                            {product.color?.map((c) => (
                                <FilterColor
                                    color={c}
                                    key={c}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size: </FilterTitle>
                            <FilterSize
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {product.size?.map((s) => (
                                    <FilterSizeOption key={s}>
                                        {s}
                                    </FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>

                    <AddContainer>
                        <AmountContainer>
                            <Remove
                                onClick={() => {
                                    if (amount > 1) {
                                        setAmount(amount - 1);
                                    }
                                }}
                            />
                            <Amount>{amount}</Amount>
                            <Add onClick={() => setAmount(amount + 1)} />
                        </AmountContainer>
                        <Button onClick={addToCartHandler}>ADD TO CART</Button>
                    </AddContainer>
                    {JSON.parse(admin) && <UpdateProduct />}
                </InfoContainer>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Product;
