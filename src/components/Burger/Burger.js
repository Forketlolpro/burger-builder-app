import React from 'react';
import BurgerIngredient from './Burgeringredient/Burgeringredient'
import styles from './Burger.module.scss'

const burger = (props) => {
    const transformdIngrediens = Object.keys(props.ingrediens)
    .map(igKey => {
        return [...Array(props.ingrediens[igKey])]
            .map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
    })
    .reduce((arr,ell) => {
        return arr.concat(ell);
    }, []);

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {transformdIngrediens.length === 0 ? 'Please start adding ingredients': transformdIngrediens}
            <BurgerIngredient type = "bread-bottom"/>
        </div>
    );
}

export default burger;