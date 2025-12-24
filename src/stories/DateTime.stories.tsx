import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  FormLabel,
  InputAdornment,
  IconButton,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { brandColors } from '../theme';

/**
 * # Date & Time Inputs
 * 
 * Components for selecting dates, times, and date ranges.
 * 
 * ## Components
 * - **Date Input**: Basic date field
 * - **Date Picker**: Date with calendar popup
 * - **Date Range**: Select start and end dates
 * - **Time Input**: Time selection
 * - **DateTime**: Combined date and time
 * 
 * ## Features
 * - Calendar picker
 * - Time selection
 * - Range selection
 * - Custom formatting
 */

interface DateTimeDemoProps {
  variant?: 'dateInput' | 'datePicker' | 'dateRange' | 'timePicker' | 'dateTime' | 'custom';
  size?: 'small' | 'medium';
}

const DateTimeDemo = ({ variant = 'dateInput', size = 'small' }: DateTimeDemoProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs(), dayjs().add(7, 'day')]);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(dayjs());

  if (variant === 'datePicker') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 4, maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom>Date Picker with Calendar</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Date selection with calendar popup. Size: {size}
          </Typography>

          <Stack spacing={4}>
            {/* Basic date picker */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Basic Date Picker</Typography>
              <DatePicker
                label="Select date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* With helper text */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>With Helper Text</Typography>
              <DatePicker
                label="Birth date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Please select your birth date',
                  },
                }}
              />
            </Box>

            {/* With min/max dates */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>With Constraints</Typography>
              <DatePicker
                label="Appointment date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                minDate={dayjs()}
                maxDate={dayjs().add(30, 'day')}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Select a date within 30 days',
                  },
                }}
              />
            </Box>

            {/* Disabled specific dates */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Disable Weekends</Typography>
              <DatePicker
                label="Business day"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                shouldDisableDate={(date) => date.day() === 0 || date.day() === 6}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* Different views */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Month & Year Only</Typography>
              <DatePicker
                label="Select month"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                views={['year', 'month']}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* With error */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Error State</Typography>
              <DatePicker
                label="Invalid date"
                value={null}
                onChange={() => {}}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    error: true,
                    helperText: 'Please select a valid date',
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </LocalizationProvider>
    );
  }

  if (variant === 'dateRange') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 4, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>Date Range with Calendar</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select a range of dates. Size: {size}
          </Typography>

          <Stack spacing={4}>
            {/* Basic date range */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Basic Date Range</Typography>
              <DateRangePicker
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                localeText={{ start: 'Start date', end: 'End date' }}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* Single input range */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Single Input Range</Typography>
              <DateRangePicker
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                slots={{ field: SingleInputDateRangeField }}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    label: 'Date range',
                  },
                }}
              />
            </Box>

            {/* With min range */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Minimum 3 Days</Typography>
              <DateRangePicker
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                minDate={dayjs()}
                localeText={{ start: 'Check-in', end: 'Check-out' }}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Minimum stay: 3 nights',
                  },
                }}
              />
            </Box>

            {/* Preset ranges - simulated with buttons */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Quick Selection</Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => setDateRange([dayjs(), dayjs().add(7, 'day')])}
                >
                  This Week
                </Button>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => setDateRange([dayjs().startOf('month'), dayjs().endOf('month')])}
                >
                  This Month
                </Button>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => setDateRange([dayjs().subtract(30, 'day'), dayjs()])}
                >
                  Last 30 Days
                </Button>
              </Stack>
              <DateRangePicker
                value={dateRange}
                onChange={(newValue) => setDateRange(newValue)}
                localeText={{ start: 'From', end: 'To' }}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </LocalizationProvider>
    );
  }

  if (variant === 'timePicker') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 4, maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom>Time Input</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Time selection components. Size: {size}
          </Typography>

          <Stack spacing={4}>
            {/* Basic time picker */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Basic Time Picker</Typography>
              <TimePicker
                label="Select time"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* 24-hour format */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>24-Hour Format</Typography>
              <TimePicker
                label="Time (24h)"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                ampm={false}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* With seconds */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>With Seconds</Typography>
              <TimePicker
                label="Precise time"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                views={['hours', 'minutes', 'seconds']}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* Time intervals */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>15-Minute Intervals</Typography>
              <TimePicker
                label="Appointment time"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                minutesStep={15}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Available in 15-minute slots',
                  },
                }}
              />
            </Box>

            {/* Min/max time */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Business Hours (9 AM - 5 PM)</Typography>
              <TimePicker
                label="Office hours"
                value={selectedTime}
                onChange={(newValue) => setSelectedTime(newValue)}
                minTime={dayjs().hour(9).minute(0)}
                maxTime={dayjs().hour(17).minute(0)}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Select between 9 AM and 5 PM',
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </LocalizationProvider>
    );
  }

  if (variant === 'dateTime') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 4, maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom>Date & Time Combined</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select both date and time. Size: {size}
          </Typography>

          <Stack spacing={4}>
            {/* Basic datetime */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Basic DateTime Picker</Typography>
              <DateTimePicker
                label="Select date & time"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* Event scheduling */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Event Scheduling</Typography>
              <Stack spacing={2}>
                <DateTimePicker
                  label="Start"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{
                    textField: { size, fullWidth: true },
                  }}
                />
                <DateTimePicker
                  label="End"
                  value={selectedDate?.add(1, 'hour')}
                  onChange={() => {}}
                  minDateTime={selectedDate || undefined}
                  slotProps={{
                    textField: { size, fullWidth: true },
                  }}
                />
              </Stack>
            </Box>

            {/* With timezone info */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>With Timezone</Typography>
              <DateTimePicker
                label="Meeting time"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Times shown in your local timezone (PST)',
                  },
                }}
              />
            </Box>

            {/* Future only */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Future Events Only</Typography>
              <DateTimePicker
                label="Schedule for"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                minDateTime={dayjs()}
                slotProps={{
                  textField: { 
                    size, 
                    fullWidth: true,
                    helperText: 'Must be a future date and time',
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </LocalizationProvider>
    );
  }

  if (variant === 'custom') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ p: 4, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>Custom Date Inputs</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Various customization options.
          </Typography>

          <Stack spacing={4}>
            {/* Custom format */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Custom Format</Typography>
              <DatePicker
                label="Date (MM/DD/YYYY)"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                format="MM/DD/YYYY"
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* European format */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>European Format</Typography>
              <DatePicker
                label="Date (DD.MM.YYYY)"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                format="DD.MM.YYYY"
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* ISO format */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>ISO Format</Typography>
              <DatePicker
                label="Date (YYYY-MM-DD)"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* With clearable */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>Clearable</Typography>
              <DatePicker
                label="Optional date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  field: { clearable: true },
                  textField: { size, fullWidth: true },
                }}
              />
            </Box>

            {/* Form example */}
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Travel Booking Form</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Departure"
                    value={dateRange[0]}
                    onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
                    minDate={dayjs()}
                    slotProps={{
                      textField: { size, fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Return"
                    value={dateRange[1]}
                    onChange={(newValue) => setDateRange([dateRange[0], newValue])}
                    minDate={dateRange[0] || dayjs()}
                    slotProps={{
                      textField: { size, fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TimePicker
                    label="Departure Time"
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    slotProps={{
                      textField: { size, fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Passengers"
                    type="number"
                    defaultValue={1}
                    size={size}
                    fullWidth
                    inputProps={{ min: 1, max: 10 }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Box>
      </LocalizationProvider>
    );
  }

  // dateInput variant (default)
  return (
    <Box sx={{ p: 4, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>Date Input (Manual Entry)</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Basic date input without calendar. Size: {size}
      </Typography>

      <Stack spacing={4}>
        {/* Basic date input */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Basic Date Input</Typography>
          <TextField
            label="Date"
            type="date"
            size={size}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* With icon */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>With Calendar Icon</Typography>
          <TextField
            label="Date"
            type="date"
            size={size}
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Date with placeholder */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>With Placeholder</Typography>
          <TextField
            label="Birth Date"
            placeholder="MM/DD/YYYY"
            size={size}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarTodayIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* With min/max */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>With Constraints</Typography>
          <TextField
            label="Future Date"
            type="date"
            size={size}
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: dayjs().format('YYYY-MM-DD'),
            }}
            helperText="Must select a future date"
          />
        </Box>

        {/* Manual entry formats */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Different Formats</Typography>
          <Stack spacing={2}>
            <TextField
              label="MM/DD/YYYY"
              placeholder="01/15/2024"
              size={size}
              fullWidth
            />
            <TextField
              label="DD-MM-YYYY"
              placeholder="15-01-2024"
              size={size}
              fullWidth
            />
            <TextField
              label="YYYY-MM-DD (ISO)"
              placeholder="2024-01-15"
              size={size}
              fullWidth
            />
          </Stack>
        </Box>

        {/* Disabled */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Disabled</Typography>
          <TextField
            label="Date"
            type="date"
            size={size}
            fullWidth
            disabled
            value="2024-01-15"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Error state */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>Error State</Typography>
          <TextField
            label="Invalid Date"
            type="date"
            size={size}
            fullWidth
            error
            helperText="Please enter a valid date"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

const meta: Meta<typeof DateTimeDemo> = {
  title: 'Inputs/DateTime',
  component: DateTimeDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Date and time input components.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dateInput', 'datePicker', 'dateRange', 'timePicker', 'dateTime', 'custom'],
      description: 'Component variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic date input without calendar.
 */
export const DateInput: Story = {
  args: {
    variant: 'dateInput',
    size: 'small',
  },
};

/**
 * Date picker with calendar popup.
 */
export const DatePickerCalendar: Story = {
  args: {
    variant: 'datePicker',
    size: 'small',
  },
};

/**
 * Date range selection.
 */
export const DateRange: Story = {
  args: {
    variant: 'dateRange',
    size: 'small',
  },
};

/**
 * Time picker component.
 */
export const TimePickerInput: Story = {
  args: {
    variant: 'timePicker',
    size: 'small',
  },
};

/**
 * Combined date and time picker.
 */
export const DateTime: Story = {
  args: {
    variant: 'dateTime',
    size: 'small',
  },
};

/**
 * Custom date input configurations.
 */
export const Custom: Story = {
  args: {
    variant: 'custom',
    size: 'small',
  },
};
