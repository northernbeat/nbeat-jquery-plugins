;(function($, window, document, undefined)
{

    "use strict";

    var pluginName = "nbeatSpecialNumber";
    var defaults   = {
        propertyName: "value"
    };



    function nbeatSpecialNumber(element, options)
    {
        this.element = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.debug = true;
        this.init();
    }



    $.extend(nbeatSpecialNumber.prototype, {

        init: function()
        {
            this.initEventHandlers();

            if (this.debug == true) {
                console.log(this);
            }
        },



        initEventHandlers: function()
        {
            var self = this;
            
            this.element.on("change", function() {
                self.validate();
            });
        },



        validate: function()
        {
            var isValid = false;

            switch (this.settings.format) {
                case "no.nin": 
                    isValid = this.validateNoNin();
                     break;

                case "no.bankAccount": 
                    isValid = this.validateNoBankAccount();
                     break;

                default:
                    console.log("nbeat.specialNumber: Unknown number format '" + this.settings.format + "'");
            }

            console.log(this.element);
            
            if (isValid == true) {
                this.element.get(0).setCustomValidity("");
            } else {
                this.element.get(0).setCustomValidity("nbeatSpecialNumber: Invalid number value.");
            }
        },



        // Adapted from https://github.com/mikaello/norwegian-national-id-validator
        validateNoNin: function()
        {

            function validateChecksum(fieldVal)
            {

                function calculatePart(factors, valueArr)
                {
                    const productSum = factors.reduce(
                        (acc, value, index) => (acc + (value * valueArr[index])),
                        0,
                    )
                    
                    return (productSum % 11) === 0                
                }
                
                const factorsFirst  = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1]
                const factorsSecond = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1]
                const valueArr      = fieldVal.split("").map(Number)
                
                return calculatePart(factorsFirst, valueArr) &&
                       calculatePart(factorsSecond, valueArr);
            }

            
            
            function getNumberType(fieldVal)
            {
                const firstDigit = parseInt(fieldVal[0]);
                const thirdDigit = parseInt(fieldVal[2])

                if (firstDigit === 8 || firstDigit === 9) {
                    return "FHNumber";
                } else if (firstDigit >= 4 && firstDigit <= 7) {
                    return "DNumber";
                } else if (thirdDigit === 4 || thirdDigit === 5) {
                    return "HNumber";
                } else {
                    return "birthNumber"
                }
            }


            
            function possibleAgesOfPersonWithIdNumber(elevenDigits)
            {
                const possibleAge = possibleAgeOfPersonWithIdNumber(elevenDigits);
                return possibleAge == null ? [] : [possibleAge];
            }


            
            function possibleAgeOfPersonWithIdNumber(elevenDigits)
            {
                const birthDate = possibleBirthDateOfIdNumber(elevenDigits)
                if (birthDate == null) {
                    return undefined
                }

                const years = moment().diff(birthDate, 'years')
                return years >= 0 && years < 125 ? years : undefined;
            }


            
            function idNumberContainsBirthDate(elevenDigits)
            {
                return getNumberType(elevenDigits) !== 'FHNumber'
            }



            function possibleBirthDateOfIdNumber(elevenDigits)
            {
                if (elevenDigits.length !== 11) return undefined
                const type = getNumberType(elevenDigits)
                switch (type) {
                case 'birthNumber': return possibleBirthDateOfBirthNumber(elevenDigits)
                case 'DNumber': return possibleBirthDateOfDNumber(elevenDigits)
                case 'HNumber': return possibleBirthDateOfHNumber(elevenDigits)
                }
                return undefined
            }


            
            function possibleBirthDateOfBirthNumber(elevenDigits)
            {
                return getBirthDate(elevenDigits)
            }


            
            function possibleBirthDateOfHNumber(elevenDigits)
            {
                const correctedThirdDigit = (parseInt(elevenDigits[2]) - 4).toString()
                return getBirthDate(elevenDigits.slice(0, 2) + correctedThirdDigit + elevenDigits.slice(3,11))
            }


            
            function possibleBirthDateOfDNumber(elevenDigits)
            {
                const correctedFirstDigit = (parseInt(elevenDigits[0]) - 4).toString()
                return getBirthDate(correctedFirstDigit + elevenDigits.slice(1, 11))
            }


            
            function getBirthDate(elevenDigitsWithDDMMYY)
            {
                const DDMM = elevenDigitsWithDDMMYY.slice(0,4)
                const YY = elevenDigitsWithDDMMYY.slice(4,6)
                const YY_int = parseInt(YY);
                const ageGroupNumber = parseInt(elevenDigitsWithDDMMYY.slice(6,9))

                let centuryPrefix = '20';
                if (ageGroupNumber >= 0 && ageGroupNumber < 500) {
                    centuryPrefix = '19'
                } else if (ageGroupNumber >= 500 && ageGroupNumber < 750 && YY_int >= 54) {
                    centuryPrefix = '18'
                } else if (ageGroupNumber >= 900 && ageGroupNumber < 1000 && YY_int >= 40) {
                    centuryPrefix = '19'
                }

                const birthDate = moment(DDMM + centuryPrefix + YY, 'DDMMYYYY', true)
                return birthDate.isValid() ? birthDate : undefined;
            }


            
            var fieldVal = this.element.val();
            var numberType;

            fieldVal.trim();
            fieldVal = fieldVal.replace(/\s/g, "");
            
            if (isNaN(fieldVal) || 
                fieldVal.length != 11 || 
                !validateChecksum(fieldVal)) {
                return false;
            }

            numberType = getNumberType(fieldVal);

            if (numberType === "FHNumber") {
                return true;
            } else {
                return possibleAgesOfPersonWithIdNumber(fieldVal).length > 0;
            }
        },
        


        // Adapt from https://github.com/smh/checkdigit
        validateNoBankAccount: function()
        {
            function isValid(input)
            {
                var checkDigitIndex = input.length - 1;
                return input.substr(checkDigitIndex) === create(input.substr(0, checkDigitIndex));
            }
            
            function apply(input)
            {
                return input + create(input);
            }
            
            function create(input)
            {
                var sum = 0;
                input.split('').reverse().forEach(function (value, index) {
                    sum += parseInt(value, 10) * (index % 6 + 2);
                });
                var sumMod11 = sum % 11;
                if (sumMod11 === 0) {
                    return '0';
                } else if (sumMod11 === 1) {
                    return '-';
                } else {
                    return (11 - sumMod11) + '';
                }
            }

            var fieldVal = this.element.val();

            fieldVal.trim();
            fieldVal = fieldVal.replace(/\D/g, "");

            if (isNaN(fieldVal) || 
                fieldVal.length != 11) {
                return false;
            }

            return isValid(fieldVal);
        }
        
    });


    $.fn[pluginName] = function(options)
    {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new nbeatSpecialNumber(this, options));
            }
        });
    };

})(jQuery, window, document);
