// Age Tracker Web App
class AgeTracker {
    constructor() {
        this.birthDateTime = null;
        this.updateInterval = null;
        this.selectedDate = new Date();
        this.selectedTime = '12:00';
        
        this.initializeElements();
        this.bindEvents();
        this.loadFromStorage();
    }

    initializeElements() {
        // Screens
        this.inputScreen = document.getElementById('input-screen');
        this.ageScreen = document.getElementById('age-screen');
        
        // Input elements
        this.dateButton = document.getElementById('date-button');
        this.timeButton = document.getElementById('time-button');
        this.startButton = document.getElementById('start-button');
        this.resetButton = document.getElementById('reset-button');
        
        // Display elements
        this.selectedDateSpan = document.getElementById('selected-date');
        this.selectedTimeSpan = document.getElementById('selected-time');
        
        // Age display elements
        this.yearsElement = document.getElementById('years');
        this.monthsElement = document.getElementById('months');
        this.weeksElement = document.getElementById('weeks');
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.totalDaysElement = document.getElementById('total-days');
        this.totalHoursElement = document.getElementById('total-hours');
        
        // Birth info elements
        this.birthDateText = document.getElementById('birth-date-text');
        this.birthTimeText = document.getElementById('birth-time-text');
        
        // Modal elements
        this.dateModal = document.getElementById('date-modal');
        this.timeModal = document.getElementById('time-modal');
        this.datePicker = document.getElementById('date-picker');
        this.timePicker = document.getElementById('time-picker');
        
        // Modal buttons
        this.confirmDateButton = document.getElementById('confirm-date');
        this.cancelDateButton = document.getElementById('cancel-date');
        this.confirmTimeButton = document.getElementById('confirm-time');
        this.cancelTimeButton = document.getElementById('cancel-time');
        this.closeDateModalButton = document.getElementById('close-date-modal');
        this.closeTimeModalButton = document.getElementById('close-time-modal');
    }

    bindEvents() {
        // Button events
        this.dateButton.addEventListener('click', () => this.showDateModal());
        this.timeButton.addEventListener('click', () => this.showTimeModal());
        this.startButton.addEventListener('click', () => this.startTracking());
        this.resetButton.addEventListener('click', () => this.reset());
        
        // Modal events
        this.confirmDateButton.addEventListener('click', () => this.confirmDate());
        this.cancelDateButton.addEventListener('click', () => this.hideDateModal());
        this.confirmTimeButton.addEventListener('click', () => this.confirmTime());
        this.cancelTimeButton.addEventListener('click', () => this.hideTimeModal());
        this.closeDateModalButton.addEventListener('click', () => this.hideDateModal());
        this.closeTimeModalButton.addEventListener('click', () => this.hideTimeModal());
        
        // Modal backdrop clicks
        this.dateModal.addEventListener('click', (e) => {
            if (e.target === this.dateModal) this.hideDateModal();
        });
        this.timeModal.addEventListener('click', (e) => {
            if (e.target === this.timeModal) this.hideTimeModal();
        });
        
        // Input events
        this.datePicker.addEventListener('change', (e) => {
            this.selectedDate = new Date(e.target.value);
            this.updateDateDisplay();
        });
        
        this.timePicker.addEventListener('change', (e) => {
            this.selectedTime = e.target.value;
            this.updateTimeDisplay();
        });
    }

    showDateModal() {
        this.dateModal.classList.remove('hidden');
        this.datePicker.focus();
    }

    hideDateModal() {
        this.dateModal.classList.add('hidden');
    }

    showTimeModal() {
        this.timeModal.classList.remove('hidden');
        this.timePicker.focus();
    }

    hideTimeModal() {
        this.timeModal.classList.add('hidden');
    }

    confirmDate() {
        this.updateDateDisplay();
        this.hideDateModal();
    }

    confirmTime() {
        this.updateTimeDisplay();
        this.hideTimeModal();
    }

    updateDateDisplay() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.selectedDateSpan.textContent = this.selectedDate.toLocaleDateString('en-US', options);
    }

    updateTimeDisplay() {
        const [hours, minutes] = this.selectedTime.split(':');
        const time = new Date();
        time.setHours(parseInt(hours), parseInt(minutes));
        this.selectedTimeSpan.textContent = time.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    startTracking() {
        // Create birth datetime
        const [hours, minutes] = this.selectedTime.split(':');
        this.birthDateTime = new Date(this.selectedDate);
        this.birthDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        // Save to storage
        this.saveToStorage();
        
        // Switch screens
        this.showAgeScreen();
        
        // Start real-time updates
        this.startRealTimeUpdates();
        
        // Update birth info
        this.updateBirthInfo();
    }

    reset() {
        // Stop real-time updates
        this.stopRealTimeUpdates();
        
        // Clear storage
        localStorage.removeItem('ageTracker_birthDateTime');
        
        // Reset state
        this.birthDateTime = null;
        
        // Switch screens
        this.showInputScreen();
    }

    showInputScreen() {
        this.inputScreen.classList.remove('hidden');
        this.ageScreen.classList.add('hidden');
    }

    showAgeScreen() {
        this.inputScreen.classList.add('hidden');
        this.ageScreen.classList.remove('hidden');
    }

    startRealTimeUpdates() {
        // Update immediately
        this.updateAge();
        
        // Update every second
        this.updateInterval = setInterval(() => {
            this.updateAge();
        }, 1000);
    }

    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    updateAge() {
        if (!this.birthDateTime) return;

        const now = new Date();
        const diff = now - this.birthDateTime;
        
        // Calculate time units
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        
        // Calculate years, months, weeks
        const years = this.calculateYears(this.birthDateTime, now);
        const months = this.calculateMonths(this.birthDateTime, now);
        const weeks = this.calculateWeeks(this.birthDateTime, now);
        const days = this.calculateDays(this.birthDateTime, now);
        const hours = this.calculateHours(this.birthDateTime, now);
        const minutes = this.calculateMinutes(this.birthDateTime, now);
        const seconds = this.calculateSeconds(this.birthDateTime, now);
        
        // Update display with animation
        this.animateValue(this.yearsElement, years);
        this.animateValue(this.monthsElement, months);
        this.animateValue(this.weeksElement, weeks);
        this.animateValue(this.daysElement, days);
        this.animateValue(this.hoursElement, hours);
        this.animateValue(this.minutesElement, minutes);
        this.animateValue(this.secondsElement, seconds);
        this.animateValue(this.totalDaysElement, totalDays);
        this.animateValue(this.totalHoursElement, totalHours);
    }

    calculateYears(birthDate, currentDate) {
        let years = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            years--;
        }
        
        return Math.max(0, years);
    }

    calculateMonths(birthDate, currentDate) {
        let months = (currentDate.getFullYear() - birthDate.getFullYear()) * 12 + 
                    (currentDate.getMonth() - birthDate.getMonth());
        
        if (currentDate.getDate() < birthDate.getDate()) {
            months--;
        }
        
        return Math.max(0, months % 12);
    }

    calculateWeeks(birthDate, currentDate) {
        const tempDate = new Date(birthDate);
        tempDate.setFullYear(birthDate.getFullYear() + this.calculateYears(birthDate, currentDate));
        tempDate.setMonth(birthDate.getMonth() + this.calculateMonths(birthDate, currentDate));
        
        const diffTime = currentDate - tempDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.floor(diffDays / 7);
    }

    calculateDays(birthDate, currentDate) {
        const tempDate = new Date(birthDate);
        tempDate.setFullYear(birthDate.getFullYear() + this.calculateYears(birthDate, currentDate));
        tempDate.setMonth(birthDate.getMonth() + this.calculateMonths(birthDate, currentDate));
        tempDate.setDate(tempDate.getDate() + this.calculateWeeks(birthDate, currentDate) * 7);
        
        const diffTime = currentDate - tempDate;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    calculateHours(birthDate, currentDate) {
        const tempDate = new Date(birthDate);
        tempDate.setFullYear(birthDate.getFullYear() + this.calculateYears(birthDate, currentDate));
        tempDate.setMonth(birthDate.getMonth() + this.calculateMonths(birthDate, currentDate));
        tempDate.setDate(tempDate.getDate() + this.calculateWeeks(birthDate, currentDate) * 7 + this.calculateDays(birthDate, currentDate));
        
        const diffTime = currentDate - tempDate;
        return Math.floor(diffTime / (1000 * 60 * 60));
    }

    calculateMinutes(birthDate, currentDate) {
        const tempDate = new Date(birthDate);
        tempDate.setFullYear(birthDate.getFullYear() + this.calculateYears(birthDate, currentDate));
        tempDate.setMonth(birthDate.getMonth() + this.calculateMonths(birthDate, currentDate));
        tempDate.setDate(tempDate.getDate() + this.calculateWeeks(birthDate, currentDate) * 7 + this.calculateDays(birthDate, currentDate));
        tempDate.setHours(tempDate.getHours() + this.calculateHours(birthDate, currentDate));
        
        const diffTime = currentDate - tempDate;
        return Math.floor(diffTime / (1000 * 60));
    }

    calculateSeconds(birthDate, currentDate) {
        const tempDate = new Date(birthDate);
        tempDate.setFullYear(birthDate.getFullYear() + this.calculateYears(birthDate, currentDate));
        tempDate.setMonth(birthDate.getMonth() + this.calculateMonths(birthDate, currentDate));
        tempDate.setDate(tempDate.getDate() + this.calculateWeeks(birthDate, currentDate) * 7 + this.calculateDays(birthDate, currentDate));
        tempDate.setHours(tempDate.getHours() + this.calculateHours(birthDate, currentDate));
        tempDate.setMinutes(tempDate.getMinutes() + this.calculateMinutes(birthDate, currentDate));
        
        const diffTime = currentDate - tempDate;
        return Math.floor(diffTime / 1000);
    }

    animateValue(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        if (currentValue !== targetValue) {
            element.textContent = targetValue;
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    updateBirthInfo() {
        if (!this.birthDateTime) return;
        
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = this.birthDateTime.toLocaleDateString('en-US', options);
        const timeString = this.birthDateTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        this.birthDateText.textContent = `Born on ${dateString}`;
        this.birthTimeText.textContent = `At ${timeString}`;
    }

    saveToStorage() {
        if (this.birthDateTime) {
            localStorage.setItem('ageTracker_birthDateTime', this.birthDateTime.toISOString());
        }
    }

    loadFromStorage() {
        const saved = localStorage.getItem('ageTracker_birthDateTime');
        if (saved) {
            this.birthDateTime = new Date(saved);
            this.showAgeScreen();
            this.startRealTimeUpdates();
            this.updateBirthInfo();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AgeTracker();
});

// Add service worker for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 