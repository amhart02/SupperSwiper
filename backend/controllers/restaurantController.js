const { supabase } = require('../config/database')

const getAllRestaurants = async (req, res) => {
    /* Gets all restaurants from database.
       Data: id, restaurant, url */
    let data = null;
    let error = null;

    try {
        const response = await supabase
        .from('logo')
        .select('id, restaurant, url')

        data = response.data;
        error = response.error;
    } catch (err) {
        error = err;
    } finally {
        if (!error) {
           res.json(data);
        } else {
           res.status(500).json({ message: "Error occured while grabbing data." });
        }
    }
};

const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    let data = null;
    let error = null;

    try {
        const response = await supabase
        .from('logo')
        .select('id, restaurant, url')
        .eq('id', id);

        data = response.data;
        error = response.error;
    } catch (err) {
        error = err;
    } finally {
        if (!error) {
            res.json(data);
        } else {
            res.status(500).json({ message: "Error occured while grabbing the data."})
        }
    }
}

module.exports = { getAllRestaurants, getRestaurantById };