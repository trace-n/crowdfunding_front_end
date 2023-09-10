import { useState, useEffect } from 'react';
import getStatistics from '../api/get-statistics';

export default function useStatistics() {
    const [statistics, setStatistics] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getStatistics()
            .then((statistics) => {
                setStatistics(statistics);
                setIsLoading(false);
                // console.log(statistics, statistics.project_count)
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [] );

    return { statistics, isLoading, error };
}