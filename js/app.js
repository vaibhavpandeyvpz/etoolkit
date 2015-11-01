/**
 * Created by vaibhav on 1/11/15.
 */

var app = angular.module('eToolkitApp', [
    'ngCookies',
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: 'view/home.html'
        })
        .when('/base64-encoder-decoder', {
            controller: 'Base64EncDecCtrl',
            templateUrl: 'view/base64-encode-decode.html'
        })
        .when('/hash-calculator', {
            controller: 'HashCalcCtrl',
            templateUrl: 'view/hash-calculator.html'
        })
        .when('/passwords-generator', {
            controller: 'PassGenCtrl',
            templateUrl: 'view/passwords-generator.html'
        })
        .when('/text-counter', {
            controller: 'TxtCounterCtrl',
            templateUrl: 'view/text-counter.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

/**
 * Directives
 */
app.directive('etHeader', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: [
            '<div class="header">',
            '    <h1>{{ page }}</h1>',
            "    <h2>{{ description }}</h2>",
            "</div>"
        ].join("")
    };
});

/**
 * Factories
 */
app.factory('CookieUtils', function ($cookies) {
    var exports = {};
    exports.get = function (key, def) {
        var value = $cookies.get(key);
        return typeof value === 'undefined' ? def : value;
    };
    exports.set = function (key, value) {
        $cookies.put(key, value);
    };
    return exports;
});

app.factory('HashUtils', function (TextUtils) {
    var exports = {};
    exports.getHash = function (text, algo) {
        if (!TextUtils.isEmpty(text)) {
            switch (algo) {
                case 'MD5':
                    return SparkMD5.hash(text, false);
                case 'SHA-1':
                case 'SHA-224':
                case 'SHA-256':
                case 'SHA-384':
                case 'SHA-512':
                    var sha = new jsSHA(algo, 'TEXT');
                    sha.update(text);
                    return sha.getHash('HEX');
                default:
                    break;
            }
        }
        return null;
    };
    return exports;
});

app.factory('MathUtils', function () {
    var exports = {};
    exports.getRandom = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return exports;
});

app.factory('TextUtils', function () {
    var exports = {};
    exports.isEmpty = function (text) {
        return (typeof text !== 'string') || text.length < 1
    };
    return exports;
});

/**
 * Controllers
 */
app.controller('Base64EncDecCtrl', function ($scope) {
    $scope.description = 'Decode or Encode provided text from/to Base64';
    $scope.page = 'Base64 Encoder/Decoder';
    $scope.decode = function () {
        $scope.base64_to = window.atob($scope['base64_from']);
    };
    $scope.encode = function () {
        $scope.base64_to = window.btoa($scope['base64_from']);
    };
});

app.controller('HomeCtrl', function ($scope) {
    $scope.description = "Open source, client-side tools for things you shouldn't trust anything else";
    $scope.page = $scope.title + ' - Online Toolkit';
});

app.controller('HashCalcCtrl', function ($scope, HashUtils) {
    $scope.description = 'Calculate MD5/SHA-1/SHA-224/SHA-256/SHA-512 hashes for provided text';
    $scope.page = 'Hash Calculator';
    $scope.hasher_algo = 'MD5';
    $scope.calculate = function () {
        $scope.hasher_hash = HashUtils.getHash($scope['hasher_text'], $scope.hasher_algo);
    };
});

app.controller('PassGenCtrl', function ($scope, CookieUtils, MathUtils) {
    $scope.description = 'Generate in-browser, random & therefore, secure passwords';
    $scope.page = 'Passwords Generator';
    $scope.passgen_lalpha = CookieUtils.get('passgen_lalpha', 'true') == 'true';
    $scope.passgen_length = parseInt(CookieUtils.get('passgen_length', 16));
    $scope.passgen_noambigious = CookieUtils.get('passgen_noambigious', 'true') == 'true';
    $scope.passgen_noduplicate = CookieUtils.get('passgen_noduplicate', 'false') == 'true';
    $scope.passgen_nospecial = CookieUtils.get('passgen_nospecial', 'false') == 'true';
    $scope.passgen_numbers = CookieUtils.get('passgen_numbers', 'true') == 'true';
    $scope.passgen_password = '';
    $scope.passgen_save = CookieUtils.get('passgen_save', 'false') == 'true';
    $scope.passgen_symbols = CookieUtils.get('passgen_symbols', 'true') == 'true';
    $scope.passgen_ualpha = CookieUtils.get('passgen_ualpha', 'true') == 'true';
    $scope.generate = function () {
        var table = "";
        if ($scope.passgen_numbers) {
            table += "23456789";
            if (!$scope.passgen_noambigious) {
                table += "10";
            }
        }
        if ($scope.passgen_lalpha) {
            table += "abcdefghjkmnpqrstuvwxyz";
            if (!$scope.passgen_noambigious) {
                table += "ilo";
            }
        }
        if ($scope.passgen_ualpha) {
            table += "ABCDEFHJHKLMNPQRSTUVWXYZ";
            if (!$scope.passgen_noambigious) {
                table += "IO";
            }
        }
        if ($scope.passgen_symbols) {
            table += "@#$%^&*+=-~";
            if (!$scope.passgen_nospecial) {
                table += "'\"`(){}[]/\\<>";
            }
        }
        var password = "";
        for (var i = 0; i < $scope.passgen_length; i++) {
            var char = table[MathUtils.getRandom(0, table.length - 1)];
            if ($scope.passgen_noduplicate && (password.indexOf(char) > -1)) {
                i--;
                continue;
            }
            password += char;
        }
        $scope.passgen_password = password;
        if ($scope.passgen_save) {
            CookieUtils.set('passgen_lalpha', $scope.passgen_lalpha);
            CookieUtils.set('passgen_length', $scope.passgen_length);
            CookieUtils.set('passgen_noambigious', $scope.passgen_noambigious);
            CookieUtils.set('passgen_noduplicate', $scope.passgen_noduplicate);
            CookieUtils.set('passgen_nospecial', $scope.passgen_nospecial);
            CookieUtils.set('passgen_numbers', $scope.passgen_numbers);
            CookieUtils.set('passgen_save', $scope.passgen_save);
            CookieUtils.set('passgen_symbols', $scope.passgen_symbols);
            CookieUtils.set('passgen_ualpha', $scope.passgen_ualpha);
        }
    };
    $scope.generate();
});

app.controller('TxtCounterCtrl', function ($scope, TextUtils) {
    $scope.description = 'Count lines, words, characters & whitespaces in provided text';
    $scope.page = 'Text Counter';
    $scope.changed = function () {
        var txt = $scope['txtc_text'];
        if (TextUtils.isEmpty(txt)) {
            $scope.txtc_characters = 0;
            $scope.txtc_lines = 0;
            $scope.txtc_spaces = 0;
            $scope.txtc_words = 0;
        } else {
            $scope.txtc_characters = txt.length;
            $scope.txtc_lines = txt.split(/\r\n|\r|\n/).length;
            $scope.txtc_spaces = txt.match(/\s+/g).length;
            $scope.txtc_words = txt.match(/\w+/g).length;
        }
    };
    $scope.changed();
});

/**
 * Exec
 */
app.run(function ($rootScope) {
    $rootScope.title = 'eToolkit';
    $rootScope.range = function (from, to) {
        var items = [],
            max = to - from;
        items[0] = from;
        max++;
        for (var i = 1; i < max; i++) {
            items[i] = ++from;
        }
        return items;
    };
});
