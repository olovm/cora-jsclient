<!--
  ~ Copyright 2016 Uppsala University Library
  ~
  ~ This file is part of Cora.
  ~
  ~     Cora is free software: you can redistribute it and/or modify
  ~     it under the terms of the GNU General Public License as published by
  ~     the Free Software Foundation, either version 3 of the License, or
  ~     (at your option) any later version.
  ~
  ~     Cora is distributed in the hope that it will be useful,
  ~     but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~     GNU General Public License for more details.
  ~
  ~     You should have received a copy of the GNU General Public License
  ~     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
  -->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output encoding="UTF-8" method="xml"/>

    <xsl:template match="testsuite">
        <unitTest version="1">
            <xsl:for-each-group select="testcase" group-by="@classname">
                <file>
                    <xsl:attribute name="path">
                        <xsl:text>src/test/script/</xsl:text>
                        <xsl:value-of select="current-grouping-key()"/>
                    </xsl:attribute>

                    <xsl:for-each select="current-group()">
                        <testCase name="{@name}" duration="{@time * 1000}"/>
                    </xsl:for-each>
                </file>
            </xsl:for-each-group>
        </unitTest>
    </xsl:template>
</xsl:stylesheet>