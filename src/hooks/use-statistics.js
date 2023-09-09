import { useState, useEffect } from 'react';
import getStatistics from '../api/get-statistics';

export default function useStatistics() {
    const [statistics, setStatistics] = useState();
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [errorStats, setErrorStats] = useState();

    useEffect(() => {
        getStatistics()
            .then((statistics) => {
                setStatistics(statistics);
                setIsLoadingStats(false);
                // console.log(statistics, statistics.project_count)
            })
            .catch((error) => {
                setErrorStats(error);
                setIsLoadingStats(false);
            });
    }, [] );

    return { statistics, isLoadingStats, errorStats };
}