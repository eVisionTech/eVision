from pysnmp.entity import engine, config
from pysnmp.carrier.asyncore.dgram import udp
from pysnmp.entity.rfc3413 import cmdgen
from pysnmp.proto import rfc1902
import argparse

# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-host", "--host", required=True)
ap.add_argument("-user", "--user", required=True)
ap.add_argument("-password", "--password", required=True)
#ap.add_argument("-host", "--host", required=True)
args = vars(ap.parse_args())

# Create SNMP engine instance
snmpEngine = engine.SnmpEngine()

#
# SNMPv3/USM setup
#

# !!!авторизационные данные для SNMPv3, которые заданы на домофоне!!!
config.addV3User(
    snmpEngine, args["user"],#'readwrite_user',  
    config.usmHMACMD5AuthProtocol, args["password"],#'password', #MD5 и его пароль
    config.usmDESPrivProtocol, args["password"],#'password'  #DES  его пароль
)
#config.addTargetParams(snmpEngine, 'my-creds', args["passord"],'readwrite_user', 'authPriv')
config.addTargetParams(snmpEngine, 'my-creds', args["user"], 'authPriv')

#
# Setup transport endpoint and bind it with security settings yielding
# a target name
#

# UDP/IPv4
config.addTransport(
    snmpEngine,
    udp.domainName,
    udp.UdpSocketTransport().openClientMode()
)
config.addTargetAddr(
    snmpEngine, 'my-router',
    udp.domainName, (args["host"], 161),  #IP адрес домофона и порт SNMP
    'my-creds'
)


# Error/response receiver
# noinspection PyUnusedLocal,PyUnusedLocal,PyUnusedLocal
def cbFun(snmpEngine, sendRequestHandle, errorIndication,
          errorStatus, errorIndex, varBinds, cbCtx):
    if errorIndication:
        print(errorIndication)
    elif errorStatus:
        print('%s at %s' % (errorStatus.prettyPrint(),
                            errorIndex and varBinds[int(errorIndex) - 1][0] or '?'))
    else:
        for oid, val in varBinds:
            print('%s = %s' % (oid.prettyPrint(), val.prettyPrint()))


# Prepare and send a request message
cmdgen.SetCommandGenerator().sendVarBinds(
    snmpEngine,
    'my-router',
    None, '',  # contextEngineId, contextName
    [((1, 3, 6, 1, 4, 1, 4249, 2, 8, 164, 2, 7, 0), rfc1902.Integer('1'))], #OID отвечающий за открытие двери
    cbFun
)

snmpEngine.transportDispatcher.runDispatcher()
