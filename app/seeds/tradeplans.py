from app.models import db, Instrument

def seed_instruments():

    usdjpy = Instrument(symbol='USDJPY', name='US Dollar / Japanese Yen')
    usdchf = Instrument(symbol='USDCHF', name='US Dollar / Swiss Franc')
    usdcad = Instrument(symbol='USDCAD', name='US Dollar / Canadian Dollar')
    eurusd = Instrument(symbol='EURUSD', name='Euro / US Dollar')
    gbpusd = Instrument(symbol='GBPUSD', name='Brittish Pound / US Dollar')
    audusd = Instrument(symbol='AUDUSD', name='Aussie Dollar / US Dollar')
    nzdusd = Instrument(symbol='NZDUSD', name='New Zealand Dollar / US Dollar')

    db.session.add(usdjpy)
    db.session.add(usdchf)
    db.session.add(usdcad)
    db.session.add(eurusd)
    db.session.add(gbpusd)
    db.session.add(audusd)
    db.session.add(nzdusd)

    db.session.commit()

def undo_instruments():
    db.session.execute('TRUNCATE instruments RESTART IDENTITY CASCADE;')
    db.session.commit()
