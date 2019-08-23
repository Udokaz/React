import React from 'react';
import UniversalRouter from 'universal-router';
import HomePage from './Components/HomePage';
import ItemDetail from './Components/ItemDetail';
import IngredientList from './Components/IngredientList';
import DeleteItem from './Components/DeleteItem';

const router = new UniversalRouter( { 
    path: '/',
    children: [
        { 
            path: '',
            action: () => <HomePage /> 
        },
        { 
            path: '/shopping-list',
            children: [
                {
                    path: '/', 
                    action: () => <IngredientList />
                },
                {
                    path: '', 
                    action: () => <IngredientList />
                },
                { 
                    path: '/new',
                    children: [
                        {
                            path: '',
                            action: () => <ItemDetail newName={""}/>
                        },
                        {
                            path: '/:name',
                            action: (context) => <ItemDetail newName={context.params.name} />
                        }
                    ]
                },
                { 
                    path: '/:id', 
                    action: (context) => <ItemDetail id={context.params.id} />
                },
                { 
                    path: '/delete/:id',
                    action: (context) => <DeleteItem id={context.params.id}/>
                },
            ]
        },
    ]
} )


export default router;