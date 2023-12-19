import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Box, Alert, InputLabel, Select, MenuItem, FormControl, Typography, Card, CardContent } from '@mui/material';

const YourComponent = () => {
    const [prekes, setPrekes] = useState([]);
    const [userTransactions, setUserTransactions] = useState([]);
    const [allPatiekalaiIngredients, setAllPatiekalaiIngredients] = useState([]);
    const [allPatiekalai, setAllPatiekalai] = useState([]);
    const [recommendedDishes, setRecommendedDishes] = useState([]); // Placeholder, replace with actual data structure
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch krepselio prekes
                const response = await fetch('http://localhost:5031/KrepselioPreke');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setPrekes(data);

                // Extract fkPatiekalasIDs
                const fkPatiekalasIDs = prekes.map((krepselioPreke) => krepselioPreke.fkPatiekalasID);

                // Fetch ingredients for each patiekalas
                const patiekalasPromises = fkPatiekalasIDs.map(async (fkPatiekalasID) => {
                    const patiekalasResponse = await fetch(`http://localhost:5031/api/patiekalas/ingredientai/${fkPatiekalasID}`);
                    if (patiekalasResponse.ok) {
                        const patiekalasData = await patiekalasResponse.json();

                        return { ingredients: patiekalasData };
                    }
                    return { ingredients: [] };
                });

                // Fetch all patiekalai
                const allPatiekalaiResponse = await fetch('http://localhost:5031/api/patiekalas');
                if (!allPatiekalaiResponse.ok) {
                    throw new Error(`HTTP error! Status: ${allPatiekalaiResponse.status}`);
                }

                const allPatiekalaiData = await allPatiekalaiResponse.json();
                setAllPatiekalai(allPatiekalaiData);

                // Extract fkPatiekalasIDs for all patiekalai
                const allPatiekalaiFkIDs = allPatiekalaiData.map((patiekalas) => patiekalas.patiekalasID);
                const allPatiekalaiPromises = allPatiekalaiFkIDs.map(async (allPatiekalaiFkID) => {
                    const patiekalasResponse = await fetch(`http://localhost:5031/api/patiekalas/ingredientai/${allPatiekalaiFkID}`);

                    if (patiekalasResponse.ok) {
                        const patiekalasData = await patiekalasResponse.json();

                        return { id: allPatiekalaiFkID, ingredients: patiekalasData };
                    }
                    return { id: allPatiekalaiFkID, ingredients: [] };
                });

                // Wait for all promises to resolve
                const patiekalasIngredients = await Promise.all(patiekalasPromises);
                const allPatiekalaiIngredients = await Promise.all(allPatiekalaiPromises);

                const flattenedUserTransactions = patiekalasIngredients.flat();
                const flattenedAll = allPatiekalaiIngredients.flat();

                // Set userTransactions and allPatiekalaiIngredients
                setUserTransactions(flattenedUserTransactions);
                setAllPatiekalaiIngredients(flattenedAll);

                const associationRules = apriori(flattenedUserTransactions);

                const recommendedDishes = recommendDishes(flattenedUserTransactions, flattenedAll, associationRules);

                setRecommendedDishes(recommendedDishes);
                console.log('Recommended dishes:', recommendedDishes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // Function to perform Apriori algorithm for association rule mining
    function apriori(transactions, minSupport = 2) {
        const itemCounts = {};
        const frequentItemSets = [];

        // Count the occurrences of each ingredient
        for (const transactionObj of transactions) {
            const transaction = transactionObj.ingredients; // Extract the ingredients array
            for (const ingredient of transaction) {
                itemCounts[ingredient] = (itemCounts[ingredient] || 0) + 1;
            }
        }

        // Extract frequent 1-item sets
        const frequent1ItemSets = Object.keys(itemCounts).filter((ingredient) => itemCounts[ingredient] >= minSupport);
        frequentItemSets.push(frequent1ItemSets);

        // Generate frequent item sets of size k > 1
        let k = 2;
        console.log("stuff", frequentItemSets[k - 2].length)
        while (frequentItemSets[k - 2].length > 0) {
            const candidates = generateCandidates(frequentItemSets[k - 2]);

            const candidateCounts = countCandidates(transactions, candidates);

            const frequentItemSet = candidates.filter((ingredient) => candidateCounts[ingredient] >= minSupport);

            if (frequentItemSet.length > 0) {
                frequentItemSets.push(frequentItemSet);
            }

            k++;
        }

        return frequentItemSets;
    }

    function generateCandidates(prevFrequentItemSet) {
        const candidates = [];
        const n = prevFrequentItemSet.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const candidate = [prevFrequentItemSet[i], prevFrequentItemSet[j]];
                candidates.push(candidate);
            }
        }

        return candidates;
    }

    function countCandidates(transactions, candidates) {
        const counts = {};

        for (const transactionObj of transactions) {
            const transaction = transactionObj.ingredients;

            for (const candidate of candidates) {

                if (isSubset(candidate, transaction)) {
                    counts[candidate] = (counts[candidate] || 0) + 1;
                }
            }
        }

        return counts;
    }

    function recommendDishes(userTransactions, dishes, associationRules) {
        const userIngredients = userTransactions.flat();
        const recommendedDishes = new Set();

        for (const rule of associationRules) {
            const { left, right, confidence } = rule;

            if (isSubset(left, userIngredients)) {
                for (const dishObj of dishes) {
                    const dish = dishObj.ingredients;
                    if (isSubset(right, dish.ingredients)) {
                        recommendedDishes.add(dish);
                    }
                }
            }
        }

        return Array.from(recommendedDishes);
    }

    function isSubset(subset, superset) {
        if (!Array.isArray(subset) || !Array.isArray(superset)) {
            return false;  // One or both of the arrays are undefined or not arrays
        }
        return subset.every((value) => superset.includes(value));
    }

    return (
        <div>
            <div>
                {recommendedDishes.map((recommendedDish) => (
                    <div key={recommendedDish.id}>
                        <Typography variant="h6" gutterBottom>
                            Recommended Dish: {recommendedDish.name}
                        </Typography>
                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                            {recommendedDish.ingredients.slice(0, 3).map((ingredient, index) => (
                                <Card key={index} sx={{ width: 200, flexShrink: 0 }}>
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {ingredient}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourComponent;