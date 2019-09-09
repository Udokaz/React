import React from 'react';
import UniversalRouter from 'universal-router';
import HomePage from './Components/HomePage';
import ItemDetail from './Components/ItemDetail';
import IngredientList from './Components/IngredientList';
import DeleteItem from './Components/DeleteItem';
import Login from './Components/Login';

const router = new UniversalRouter( { 
    path: '/',
    children: [
        { 
            path: '',
            action: (context) => <HomePage loggedIn={context.loggedIn}/> 
        },
        { 
            path: '/shopping-list',
            children: [
                {
                    path: '/', 
                    action: (context) => <IngredientList loggedIn={context.loggedIn}/>
                },
                {
                    path: '', 
                    action: (context) => <IngredientList loggedIn={context.loggedIn}/>
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
        {
            path: '/login',
            action: (context) => <Login loggedIn={context.loggedIn}/>
        }
    ]
} )


export default router;