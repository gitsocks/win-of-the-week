import { getWeekDates, getWeekNumber } from '@/utils/week';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Icon, IconButton, Select } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface SaturdaySelectorProps {
    weekNumber: number;
    onWeekChange: (newWeek: number) => void;
}

export const SaturdaySelector = ({ weekNumber, onWeekChange }: SaturdaySelectorProps) => {
    const { weekNumber: currentWeekNumber } = getWeekDates();

    const isCurrentWeek = () => weekNumber == currentWeekNumber;

    return (
        <ButtonGroup size='sm' isAttached variant='outline'>
            <IconButton onClick={() => onWeekChange(weekNumber - 1)} aria-label='Last Week' icon={<Icon as={FiArrowLeft} />} />
            <Button>{weekNumber}</Button>
            {!isCurrentWeek() && <IconButton onClick={() => onWeekChange(weekNumber + 1)} aria-label='Next Week' icon={<Icon as={FiArrowRight} />} />}
        </ButtonGroup>
    );
};
