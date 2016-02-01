/*
 * Copyright 2015 Uppsala University Library
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 */

module.exports = function (grunt)
{
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/script',
                        src: '**',
                        dest: 'target/classes/script',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/test/script',
                        src: '**',
                        dest: 'target/classes/test/script',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/main/css',
                        src: '**',
                        dest: 'target/classes/css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'src/main/webapp',
                        src: '**',
                        dest: 'target/classes',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy']);
};